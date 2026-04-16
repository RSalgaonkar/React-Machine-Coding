import styles from './CheckboxTree.module.css';

interface Props {
  totalNodes: number;
  visibleNodes: number;
  selectedCount: number;
}

export default function TreeStatsBar({
  totalNodes,
  visibleNodes,
  selectedCount,
}: Props) {
  return (
    <div className={styles.statsBar}>
      <span>Total nodes: {totalNodes}</span>
      <span>Visible nodes: {visibleNodes}</span>
      <span>Selected: {selectedCount}</span>
    </div>
  );
}