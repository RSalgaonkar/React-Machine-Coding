import styles from './NestedComments.module.css';

interface Props {
  message: string;
}

export default function CommentsActivityBar({ message }: Props) {
  if (!message) return null;

  return (
    <div className={styles.activityBar} role="status" aria-live="polite">
      {message}
    </div>
  );
}