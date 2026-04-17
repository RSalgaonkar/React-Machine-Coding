import type { Message } from '../types/chat.types';

type MessageHandler = (message: Message) => void;
type TypingHandler = (payload: { conversationId: string; isTyping: boolean }) => void;

class MockChatSocket {
  private messageHandler: MessageHandler | null = null;
  private typingHandler: TypingHandler | null = null;
  private typingTimeoutId: number | null = null;

  connect() {
    return () => undefined;
  }

  onMessage(handler: MessageHandler) {
    this.messageHandler = handler;
  }

  onTyping(handler: TypingHandler) {
    this.typingHandler = handler;
  }

  emitMessage(message: Message) {
    window.setTimeout(() => {
      const simulatedReply: Message = {
        id: crypto.randomUUID(),
        conversationId: message.conversationId,
        senderId:
          message.conversationId === 'c1'
            ? 'u2'
            : message.conversationId === 'c2'
            ? 'u3'
            : 'u4',
        text: `Auto reply: received "${message.text}"`,
        createdAt: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'sent',
      };

      this.messageHandler?.(simulatedReply);
    }, 1400);
  }

  emitTyping(conversationId: string, isTyping: boolean) {
    if (this.typingTimeoutId) {
      window.clearTimeout(this.typingTimeoutId);
    }

    this.typingHandler?.({ conversationId, isTyping });

    if (isTyping) {
      this.typingTimeoutId = window.setTimeout(() => {
        this.typingHandler?.({ conversationId, isTyping: false });
      }, 1800);
    }
  }
}

export const chatSocket = new MockChatSocket();