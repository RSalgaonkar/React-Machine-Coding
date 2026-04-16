import styles from './NestedComments.module.css';

interface Props {
  likes: number;
  isLiked?: boolean;
  isDeleted?: boolean;
  isPinned?: boolean;
  hasReplies: boolean;
  areRepliesExpanded: boolean;
  canReply: boolean;
  onLike: () => void;
  onReply: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onRestore: () => void;
  onCopy: () => void;
  onPin: () => void;
  onToggleReplies: () => void;
}

export default function CommentActions({
  likes,
  isLiked,
  isDeleted,
  isPinned,
  hasReplies,
  areRepliesExpanded,
  canReply,
  onLike,
  onReply,
  onEdit,
  onDelete,
  onRestore,
  onCopy,
  onPin,
  onToggleReplies,
}: Props) {
  return (
    <div className={styles.actions}>
      <button type="button" className={styles.linkBtn} onClick={onLike} disabled={isDeleted}>
        {isLiked ? 'Unlike' : 'Like'} ({likes})
      </button>

      <button type="button" className={styles.linkBtn} onClick={onReply} disabled={!canReply || isDeleted}>
        {canReply ? 'Reply' : 'Max depth reached'}
      </button>

      <button type="button" className={styles.linkBtn} onClick={onEdit} disabled={isDeleted}>
        Edit
      </button>

      <button type="button" className={styles.linkBtn} onClick={onCopy}>
        Copy
      </button>

      <button type="button" className={styles.linkBtn} onClick={onPin}>
        {isPinned ? 'Unpin' : 'Pin'}
      </button>

      {!isDeleted ? (
        <button type="button" className={styles.linkBtnDanger} onClick={onDelete}>
          Delete
        </button>
      ) : (
        <button type="button" className={styles.linkBtn} onClick={onRestore}>
          Restore
        </button>
      )}

      {hasReplies ? (
        <button
          type="button"
          className={styles.linkBtn}
          onClick={onToggleReplies}
          aria-expanded={areRepliesExpanded}
        >
          {areRepliesExpanded ? 'Hide replies' : 'Show replies'}
        </button>
      ) : null}
    </div>
  );
}