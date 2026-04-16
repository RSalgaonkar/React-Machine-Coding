import { memo } from 'react';
import type { CommentNode } from '../types';
import { formatRelativeTime } from '../utils/commentsHelpers';
import CommentActions from './CommentActions';
import CommentComposer from './CommentComposer';
import CommentList from './CommentList';
import styles from './NestedComments.module.css';

interface Props {
  comment: CommentNode;
  level: number;
  replyDrafts: Record<string, string>;
  editDrafts: Record<string, string>;
  expandedMap: Record<string, boolean>;
  replyBoxMap: Record<string, boolean>;
  editModeMap: Record<string, boolean>;
  onSetReplyDraft: (commentId: string, value: string) => void;
  onSetEditDraft: (commentId: string, value: string) => void;
  onToggleReplies: (commentId: string) => void;
  onToggleReplyBox: (commentId: string) => void;
  onToggleEditMode: (commentId: string, existingText?: string) => void;
  onSubmitReply: (commentId: string) => void;
  onSaveEdit: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onToggleLike: (commentId: string) => void;
}

function CommentItemComponent({
  comment,
  level,
  replyDrafts,
  editDrafts,
  expandedMap,
  replyBoxMap,
  editModeMap,
  onSetReplyDraft,
  onSetEditDraft,
  onToggleReplies,
  onToggleReplyBox,
  onToggleEditMode,
  onSubmitReply,
  onSaveEdit,
  onDelete,
  onToggleLike,
}: Props) {
  const hasReplies = comment.children.length > 0;
  const areRepliesExpanded = expandedMap[comment.id] ?? true;
  const isReplyBoxOpen = replyBoxMap[comment.id] ?? false;
  const isEditing = editModeMap[comment.id] ?? false;

  return (
    <article
      className={styles.commentCard}
      style={{ marginLeft: `${Math.min(level * 20, 60)}px` }}
    >
      <div className={styles.commentHeader}>
        <div>
          <strong>{comment.author}</strong>
          <span className={styles.meta}> · {formatRelativeTime(comment.createdAt)}</span>
        </div>
      </div>

      {isEditing ? (
        <CommentComposer
          value={editDrafts[comment.id] ?? ''}
          placeholder="Edit comment..."
          submitLabel="Save"
          label="Edit comment"
          onChange={(value) => onSetEditDraft(comment.id, value)}
          onSubmit={() => onSaveEdit(comment.id)}
          onCancel={() => onToggleEditMode(comment.id)}
        />
      ) : (
        <p className={`${styles.commentText} ${comment.isDeleted ? styles.deletedText : ''}`}>
          {comment.text}
        </p>
      )}

      <CommentActions
        likes={comment.likes}
        isLiked={comment.isLiked}
        isDeleted={comment.isDeleted}
        hasReplies={hasReplies}
        areRepliesExpanded={areRepliesExpanded}
        onLike={() => onToggleLike(comment.id)}
        onReply={() => onToggleReplyBox(comment.id)}
        onEdit={() => onToggleEditMode(comment.id, comment.text)}
        onDelete={() => onDelete(comment.id)}
        onToggleReplies={() => onToggleReplies(comment.id)}
      />

      {isReplyBoxOpen ? (
        <div className={styles.replyBox}>
          <CommentComposer
            value={replyDrafts[comment.id] ?? ''}
            placeholder="Write a reply..."
            submitLabel="Reply"
            label="Reply to comment"
            onChange={(value) => onSetReplyDraft(comment.id, value)}
            onSubmit={() => onSubmitReply(comment.id)}
            onCancel={() => onToggleReplyBox(comment.id)}
          />
        </div>
      ) : null}

      {hasReplies && areRepliesExpanded ? (
        <div className={styles.replies}>
          <CommentList
            comments={comment.children}
            level={level + 1}
            replyDrafts={replyDrafts}
            editDrafts={editDrafts}
            expandedMap={expandedMap}
            replyBoxMap={replyBoxMap}
            editModeMap={editModeMap}
            onSetReplyDraft={onSetReplyDraft}
            onSetEditDraft={onSetEditDraft}
            onToggleReplies={onToggleReplies}
            onToggleReplyBox={onToggleReplyBox}
            onToggleEditMode={onToggleEditMode}
            onSubmitReply={onSubmitReply}
            onSaveEdit={onSaveEdit}
            onDelete={onDelete}
            onToggleLike={onToggleLike}
          />
        </div>
      ) : null}
    </article>
  );
}

const CommentItem = memo(CommentItemComponent);
export default CommentItem;