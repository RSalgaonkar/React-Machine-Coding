import styles from './NestedComments.module.css';

interface Props {
  likes: number;
  isLiked?: boolean;
  isDeleted?: boolean;
  hasReplies: boolean;
  areRepliesExpanded: boolean;
  onLike: () => void;
  onReply: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleReplies: () => void;
}

export default function CommentActions({
  likes,
  isLiked,
  isDeleted,
  hasReplies,
  areRepliesExpanded,
  onLike,
  onReply,
  onEdit,
  onDelete,
  onToggleReplies,
}: Props) {
  return (
    <div className={styles.actions}>
      <button type="button" className={styles.linkBtn} onClick={onLike} disabled={isDeleted}>
        {isLiked ? 'Unlike' : 'Like'} ({likes})
      </button>

      <button type="button" className={styles.linkBtn} onClick={onReply} disabled={isDeleted}>
        Reply
      </button>

      <button type="button" className={styles.linkBtn} onClick={onEdit} disabled={isDeleted}>
        Edit
      </button>

      <button
        type="button"
        className={styles.linkBtnDanger}
        onClick={onDelete}
        disabled={isDeleted}
      >
        Delete
      </button>

      {hasReplies ? (
        <button type="button" className={styles.linkBtn} onClick={onToggleReplies}>
          {areRepliesExpanded ? 'Hide replies' : 'Show replies'}
        </button>
      ) : null}
    </div>
  );
}