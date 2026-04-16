import styles from './NestedComments.module.css';

interface Props {
  totalComments: number;
  visibleComments: number;
  totalLikes: number;
  leafComments: number;
}

export default function CommentsStatsBar({
  totalComments,
  visibleComments,
  totalLikes,
  leafComments,
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
    </div>
  );
}