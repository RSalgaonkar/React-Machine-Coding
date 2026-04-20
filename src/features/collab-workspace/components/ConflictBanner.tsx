import styles from '../styles/workspace.module.css';

interface Props {
  message: string | null;
  onDismiss: () => void;
}

export default function ConflictBanner({ message, onDismiss }: Props) {
  if (!message) return null;

  return (
    <div className={styles.conflictBanner} role="alert">
      <div>
        <strong>Sync notice:</strong> {message}
      </div>
      <button type="button" onClick={onDismiss} className={styles.bannerButton}>
        Dismiss
      </button>
    </div>
  );
}