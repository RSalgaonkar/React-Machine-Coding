import styles from './NestedComments.module.css';

interface Props {
  hasSearch: boolean;
}

export default function CommentsEmptyState({ hasSearch }: Props) {
  return (
    <div className={styles.emptyState}>
      <h3>{hasSearch ? 'No matching comments found' : 'No comments yet'}</h3>
      <p>
        {hasSearch
          ? 'Try a different search keyword or clear the filter.'
          : 'Be the first one to start the discussion.'}
      </p>
    </div>
  );
}