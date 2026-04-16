import styles from './NestedComments.module.css';

interface Props {
  totalComments: number;
  visibleComments: number;
  totalLikes: number;
  leafComments: number;
  deletedComments: number;
  pinnedComments: number;
}

export default function CommentsStatsBar({
  totalComments,
  visibleComments,
  totalLikes,
  leafComments,
  deletedComments,
  pinnedComments,
}: Props) {
  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>Total Nodes</span>
        <strong>{totalComments}</strong>
      </div>

      <div className={styles.statCard}>
        <span className={styles.statLabel}>Visible Comments</span>
        <strong>{visibleComments}</strong>
      </div>

      <div className={styles.statCard}>
        <span className={styles.statLabel}>Total Likes</span>
        <strong>{totalLikes}</strong>
      </div>

      <div className={styles.statCard}>
        <span className={styles.statLabel}>Leaf Replies</span>
        <strong>{leafComments}</strong>
      </div>

      <div className={styles.statCard}>
        <span className={styles.statLabel}>Deleted</span>
        <strong>{deletedComments}</strong>
      </div>

      <div className={styles.statCard}>
        <span className={styles.statLabel}>Pinned</span>
        <strong>{pinnedComments}</strong>
      </div>
    </div>
  );
}