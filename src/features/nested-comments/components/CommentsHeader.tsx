import styles from './NestedComments.module.css';
import type { CommentsTheme } from '../types';

interface Props {
  theme: CommentsTheme;
  onToggleTheme: () => void;
}

export default function CommentsHeader({ theme, onToggleTheme }: Props) {
  return (
    <div className={styles.header}>
      <div>
        <h2 className={styles.title}>Nested Comments</h2>
        <p className={styles.subtitle}>
          Recursive threaded discussions with reducer-driven state.
        </p>
      </div>

      <button type="button" className={styles.secondaryBtn} onClick={onToggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}