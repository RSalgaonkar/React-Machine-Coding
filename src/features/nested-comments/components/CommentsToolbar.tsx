import type { CommentsTheme } from '../types';
import styles from './NestedComments.module.css';

interface Props {
  search: string;
  sortBy: 'newest' | 'oldest' | 'most-liked';
  theme: CommentsTheme;
  onSearchChange: (value: string) => void;
  onSortChange: (value: 'newest' | 'oldest' | 'most-liked') => void;
  onToggleTheme: () => void;
}

export default function CommentsToolbar({
  search,
  sortBy,
  theme,
  onSearchChange,
  onSortChange,
  onToggleTheme,
}: Props) {
  return (
    <div className={styles.toolbar}>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search comments..."
        className={styles.searchInput}
        aria-label="Search comments"
      />

      <div className={styles.toolbarActions}>
        <select
          className={styles.select}
          value={sortBy}
          onChange={(e) =>
            onSortChange(e.target.value as 'newest' | 'oldest' | 'most-liked')
          }
          aria-label="Sort comments"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="most-liked">Most liked</option>
        </select>

        <button type="button" className={styles.secondaryBtn} onClick={onToggleTheme}>
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </div>
    </div>
  );
}