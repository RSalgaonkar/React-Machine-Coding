import type { Conversation, Message } from '../types/chat.types';
import ConversationList from './ConversationList';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import styles from '../ChatLayout.module.css';

interface ChatLayoutProps {
  currentUserId: string;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  activeMessages: Message[];
  isTyping: boolean;
  selectConversation: (conversationId: string) => void;
  sendMessage: (text: string) => Promise<void>;
  handleTyping: (value: string) => void;
}

export default function ChatLayout({
  currentUserId,
  conversations,
  activeConversation,
  activeMessages,
  isTyping,
  selectConversation,
  sendMessage,
  handleTyping,
}: ChatLayoutProps) {
  return (
    <div className={styles.chatShell}>
      <ConversationList
        conversations={conversations}
        activeConversationId={activeConversation?.id ?? null}
        onSelectConversation={selectConversation}
      />

      <div className={styles.chatPanel}>
        {activeConversation ? (
          <>
            <ChatHeader conversation={activeConversation} />
            <MessageList messages={activeMessages} currentUserId={currentUserId} />
            {isTyping && <TypingIndicator name={activeConversation.participant.name} />}
            <MessageInput onSend={sendMessage} onTyping={handleTyping} />
          </>
        ) : (
          <div className={styles.emptyState}>Select a conversation to start chatting.</div>
        )}
      </div>
    </div>
  );
}