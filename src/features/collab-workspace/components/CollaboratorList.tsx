import type { Collaborator } from '../types/workspace.types';
import { formatRelativeTime } from '../utils/time';
import styles from '../styles/workspace.module.css';

export default function CollaboratorList({
  collaborators,
}: {
  collaborators: Collaborator[];
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h3>Live presence</h3>
        <span className={styles.panelMeta}>{collaborators.filter((c) => c.isOnline).length} online</span>
      </div>

      <ul className={styles.collaboratorList}>
        {collaborators.map((user) => (
          <li key={user.id} className={styles.collaboratorItem}>
            <div
              className={styles.avatar}
              style={{ backgroundColor: user.color }}
              aria-hidden="true"
            >
              {user.name.slice(0, 1).toUpperCase()}
            </div>

            <div className={styles.collaboratorBody}>
              <div className={styles.collaboratorTop}>
                <strong>
                  {user.name} {user.isYou ? '(You)' : ''}
                </strong>
                <span
                  className={`${styles.presenceDot} ${
                    user.isOnline ? styles.online : styles.offlineDot
                  }`}
                />
              </div>

              <p className={styles.collaboratorText}>
                {user.editingTaskId
                  ? `Editing ${user.editingTaskId}`
                  : user.isOnline
                  ? 'Browsing workspace'
                  : `Last active ${formatRelativeTime(user.lastActiveAt)}`}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}