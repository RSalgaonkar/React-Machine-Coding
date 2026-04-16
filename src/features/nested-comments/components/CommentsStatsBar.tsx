import styles from './NestedComments.module.css';

interface Props {
  totalComments: number;
  visibleComments: number;
}

export default function CommentsStatsBar({
  totalComments,
  visibleComments,
}: Props) {
  return (
    <div className={styles.statsBar}>
      <span>Total comments: {totalComments}</span>
      <span>Visible comments: {visibleComments}</span>
    </div>
  );
}