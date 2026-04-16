import type { TreeTheme } from '../types';
import styles from './CheckboxTree.module.css';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  theme: TreeTheme;
  onToggleTheme: () => void;
}

export default function TreeToolbar({
  search,
  onSearchChange,
  onExpandAll,
  onCollapseAll,
  theme,
  onToggleTheme,
}: Props) {
  return (
    <div className={styles.toolbar}>
      <input
        className={styles.searchInput}
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search skills..."
        aria-label="Search tree nodes"
      />

      <div className={styles.toolbarActions}>
        <button type="button" className={styles.secondaryBtn} onClick={onExpandAll}>
          Expand all
        </button>
        <button type="button" className={styles.secondaryBtn} onClick={onCollapseAll}>
          Collapse all
        </button>
        <button type="button" className={styles.secondaryBtn} onClick={onToggleTheme}>
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </div>
    </div>
  );
}