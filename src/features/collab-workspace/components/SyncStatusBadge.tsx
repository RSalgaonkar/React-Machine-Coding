import type { SyncState } from '../types/workspace.types';
import styles from '../styles/workspace.module.css';

export default function SyncStatusBadge({ state }: { state: SyncState | undefined }) {
  const label = state ?? 'saved';

  return (
    <span
      className={`${styles.syncBadge} ${
        label === 'syncing'
          ? styles.syncing
          : label === 'error'
          ? styles.error
          : label === 'offline'
          ? styles.offline
          : styles.saved
      }`}
    >
      {label}
    </span>
  );
}