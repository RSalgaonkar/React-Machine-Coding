import { useMemo, useState } from 'react';
import { initialChatState } from '../data/mockChatData';
import type { ChatState, Message } from '../types/chat.types';

export function useChat() {
  const [chatState, setChatState] = useState<ChatState>(initialChatState);

  const activeConversation = useMemo(
    () =>
      chatState.conversations.find(
        (conversation) => conversation.id === chatState.activeConversationId
      ) ?? null,
    [chatState.conversations, chatState.activeConversationId]
  );

  const activeMessages = useMemo(() => {
    if (!chatState.activeConversationId) return [];
    return chatState.messagesByConversation[chatState.activeConversationId] ?? [];
  }, [chatState.activeConversationId, chatState.messagesByConversation]);

  const selectConversation = (conversationId: string) => {
    setChatState((prev) => ({
      ...prev,
      activeConversationId: conversationId,
      conversations: prev.conversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unreadCount: 0 }
          : conversation
      ),
    }));
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || !chatState.activeConversationId) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      conversationId: chatState.activeConversationId,
      senderId: chatState.currentUserId,
      text: trimmed,
      createdAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'sent',
    };

    setChatState((prev) => {
      const updatedMessages = [
        ...(prev.messagesByConversation[prev.activeConversationId ?? ''] ?? []),
        newMessage,
      ];

      return {
        ...prev,
        messagesByConversation: {
          ...prev.messagesByConversation,
          [prev.activeConversationId as string]: updatedMessages,
        },
        conversations: prev.conversations.map((conversation) =>
          conversation.id === prev.activeConversationId
            ? {
                ...conversation,
                lastMessage: trimmed,
                updatedAt: newMessage.createdAt,
              }
            : conversation
        ),
        typingByConversation: {
          ...prev.typingByConversation,
          [prev.activeConversationId as string]: false,
        },
      };
    });
  };

  return {
    currentUserId: chatState.currentUserId,
    conversations: chatState.conversations,
    activeConversation,
    activeMessages,
    isTyping: chatState.activeConversationId
      ? chatState.typingByConversation[chatState.activeConversationId]
      : false,
    selectConversation,
    sendMessage,
  };
}