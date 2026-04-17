import type { Conversation } from '../types/chat.types';
import styles from '../ChatLayout.module.css';

interface ChatHeaderProps {
  conversation: Conversation;
}

export default function ChatHeader({ conversation }: ChatHeaderProps) {
  return (
    <header className={styles.chatHeader}>
      <div className={styles.avatar}>{conversation.participant.avatar}</div>

      <div>
        <h3 className={styles.chatTitle}>{conversation.participant.name}</h3>
        <p className={styles.chatStatus}>
          {conversation.participant.status === 'online'
            ? 'Online'
            : `Last seen ${conversation.participant.lastSeen ?? 'recently'}`}
        </p>
      </div>
    </header>
  );
}