import type { Message } from '../types/chat.types';
import styles from '../ChatLayout.module.css';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export default function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  return (
    <div className={`${styles.messageRow} ${isOwnMessage ? styles.messageRowOwn : ''}`}>
      <div
        className={`${styles.messageBubble} ${
          isOwnMessage ? styles.messageBubbleOwn : styles.messageBubbleOther
        }`}
      >
        <p>{message.text}</p>
        <div className={styles.messageMeta}>
          <span>{message.createdAt}</span>
          {isOwnMessage && <span>{message.status}</span>}
        </div>
      </div>
    </div>
  );
}