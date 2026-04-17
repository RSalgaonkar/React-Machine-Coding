import styles from '../ChatLayout.module.css';

interface TypingIndicatorProps {
  name: string;
}

export default function TypingIndicator({ name }: TypingIndicatorProps) {
  return <div className={styles.typingIndicator}>{name} is typing...</div>;
}