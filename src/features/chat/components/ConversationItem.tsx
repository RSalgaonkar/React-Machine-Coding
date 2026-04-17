import type { Conversation } from '../types/chat.types';
import styles from '../ChatLayout.module.css';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export default function ConversationItem({
  conversation,
  isActive,
  onClick,
}: ConversationItemProps) {
  return (
    <button
      type="button"
      className={`${styles.conversationItem} ${isActive ? styles.conversationItemActive : ''}`}
      onClick={onClick}
    >
      <div className={styles.avatar}>{conversation.participant.avatar}</div>

      <div className={styles.conversationMeta}>
        <div className={styles.conversationTopRow}>
          <strong>{conversation.participant.name}</strong>
          <span>{conversation.updatedAt}</span>
        </div>

        <div className={styles.conversationBottomRow}>
          <span className={styles.lastMessage}>{conversation.lastMessage}</span>
          {conversation.unreadCount > 0 && (
            <span className={styles.unreadBadge}>{conversation.unreadCount}</span>
          )}
        </div>
      </div>
    </button>
  );
}