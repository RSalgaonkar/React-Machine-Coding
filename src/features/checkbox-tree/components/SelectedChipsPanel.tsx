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
  return (
    <section className={styles.chipsPanel}>
      <div className={styles.chipsHeader}>
        <div>
          <h3 className={styles.chipsTitle}>Selected Skills</h3>
          <p className={styles.chipsSubtitle}>
            Quick overview of currently selected nodes.
          </p>
        </div>

        {!!chips.length && (
          <button type="button" className={styles.clearBtn} onClick={onClearAll}>
            Clear all
          </button>
        )}
      </div>

      {chips.length ? (
        <div className={styles.chipsWrap}>
          {chips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className={styles.chip}
              onClick={() => onRemove(chip.id)}
              aria-label={`Remove ${chip.label}`}
            >
              <span>{chip.label}</span>
              <span className={styles.chipClose}>×</span>
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.emptyChips}>
          No nodes selected yet. Start selecting items from the tree.
        </div>
      )}
    </section>
  );
}