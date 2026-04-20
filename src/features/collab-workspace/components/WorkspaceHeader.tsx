import styles from '../styles/workspace.module.css';

interface Props {
  title: string;
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
  isFetching: boolean;
  isOfflineMode: boolean;
  queueCount: number;
  onToggleOffline: () => void;
}

export default function WorkspaceHeader({
  title,
  todoCount,
  inProgressCount,
  doneCount,
  isFetching,
  isOfflineMode,
  queueCount,
  onToggleOffline,
}: Props) {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Standout portfolio feature</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>
          Optimistic updates, presence, rollback-safe sync, conflict handling, and event replay.
        </p>
      </div>

      <div className={styles.headerActions}>
        <div className={styles.metrics}>
          <span className={styles.metric}>Todo {todoCount}</span>
          <span className={styles.metric}>In Progress {inProgressCount}</span>
          <span className={styles.metric}>Done {doneCount}</span>
        </div>

        <div className={styles.headerControls}>
          <span className={styles.statusPill}>
            {isOfflineMode ? `Offline queue: ${queueCount}` : isFetching ? 'Syncing…' : 'Up to date'}
          </span>
          <button type="button" className={styles.primaryButton} onClick={onToggleOffline}>
            {isOfflineMode ? 'Go Online' : 'Simulate Offline'}
          </button>
        </div>
      </div>
    </header>
  );
}