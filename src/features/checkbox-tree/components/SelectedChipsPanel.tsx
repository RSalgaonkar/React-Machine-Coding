import type { SelectedChip } from '../types';
import styles from './CheckboxTree.module.css';

interface Props {
  chips: SelectedChip[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export default function SelectedChipsPanel({
  chips,
  onRemove,
  onClearAll,
}: Props) {
  if (!chips.length) return null;

  return (
    <div className={styles.chipsPanel}>
      <div className={styles.chipsHeader}>
        <strong>Selected items</strong>
        <button type="button" className={styles.linkBtn} onClick={onClearAll}>
          Clear all
        </button>
      </div>

      <div className={styles.chipsWrap}>
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className={styles.chip}
            onClick={() => onRemove(chip.id)}
          >
            {chip.label} ×
          </button>
        ))}
      </div>
    </div>
  );
}