import styles from './NestedComments.module.css';

interface Props {
  search: string;
  sortBy: 'newest' | 'oldest' | 'most-liked';
  onSearchChange: (value: string) => void;
  onSortChange: (value: 'newest' | 'oldest' | 'most-liked') => void;
}

export default function CommentsToolbar({
  search,
  sortBy,
  onSearchChange,
  onSortChange,
}: Props) {
  return (
    <div className={styles.toolbar}>
      <input
        className={styles.input}
        type="text"
        value={search}
        placeholder="Search comments by text or author..."
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className={styles.select}
        value={sortBy}
        onChange={(e) =>
          onSortChange(e.target.value as 'newest' | 'oldest' | 'most-liked')
        }
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="most-liked">Most Liked</option>
      </select>
    </div>
  );
}