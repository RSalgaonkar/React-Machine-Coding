import { memo, useMemo } from 'react';
import type { CommentNode } from '../types';
import { getTreeItemAriaLabel } from '../utils/commentsA11y';
import { highlightText } from '../utils/commentsHighlight';
import { formatRelativeTime } from '../utils/commentsHelpers';
import CommentActions from './CommentActions';
import CommentComposer from './CommentComposer';
import CommentList from './CommentList';
import styles from './NestedComments.module.css';

interface Props {
  comment: CommentNode;
  level: number;
  maxDepth: number;
  search: string;
  replyDrafts: Record<string, string>;
  editDrafts: Record<string, string>;
  expandedMap: Record<string, boolean>;
  replyBoxMap: Record<string, boolean>;
  editModeMap: Record<string, boolean>;
  onSetReplyDraft: (commentId: string, value: string) => void;
  onSetEditDraft: (commentId: string, value: string) => void;
  onToggleReplies: (commentId: string) => void;
  onToggleReplyBox: (commentId: string) => void;
  onCloseReplyBox: (commentId: string) => void;
  onToggleEditMode: (commentId: string, existingText?: string) => void;
  onCloseEditMode: (commentId: string) => void;
  onSubmitReply: (commentId: string) => void;
  onSaveEdit: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onRestore: (commentId: string) => void;
  onToggleLike: (commentId: string) => void;
  onPin: (commentId: string) => void;
  onCopy: (text: string) => void;
}

function CommentItemComponent({
  comment,
  level,
  maxDepth,
  search,
  replyDrafts,
  editDrafts,
  expandedMap,
  replyBoxMap,
  editModeMap,
  onSetReplyDraft,
  onSetEditDraft,
  onToggleReplies,
  onToggleReplyBox,
  onCloseReplyBox,
  onToggleEditMode,
  onCloseEditMode,
  onSubmitReply,
  onSaveEdit,
  onDelete,
  onRestore,
  onToggleLike,
  onPin,
  onCopy,
}: Props) {
  const hasReplies = comment.children.length > 0;
  const areRepliesExpanded = expandedMap[comment.id] ?? true;
  const isReplyBoxOpen = replyBoxMap[comment.id] ?? false;
  const isEditing = editModeMap[comment.id] ?? false;
  const canReply = level < maxDepth;

  const ariaLabel = useMemo(
    () =>
      getTreeItemAriaLabel({
        author: comment.author,
        level,
        hasReplies,
        isDeleted: comment.isDeleted,
      }),
    [comment.author, comment.isDeleted, hasReplies, level]
  );

  return (
    <article
      className={styles.commentCard}
      style={{ marginLeft: `${Math.min(level * 20, 60)}px` }}
      role="treeitem"
      aria-level={level + 1}
      aria-expanded={hasReplies ? areRepliesExpanded : undefined}
      aria-label={ariaLabel}
    >
      <div className={styles.commentHeader}>
        <div className={styles.authorRow}>
          <strong>{highlightText(comment.author, search)}</strong>
          <span className={styles.meta}> · {formatRelativeTime(comment.createdAt)}</span>
          {comment.isPinned ? <span className={styles.badge}>Pinned</span> : null}
          {!canReply ? <span className={styles.badgeMuted}>Reply limit reached</span> : null}
        </div>
      </div>

      {isEditing ? (
        <CommentComposer
          value={editDrafts[comment.id] ?? ''}
          placeholder="Edit comment..."
          submitLabel="Save"
          label="Edit comment"
          autoFocus
          onChange={(value) => onSetEditDraft(comment.id, value)}
          onSubmit={() => onSaveEdit(comment.id)}
          onCancel={() => onCloseEditMode(comment.id)}
        />
      ) : (
        <p className={`${styles.commentText} ${comment.isDeleted ? styles.deletedText : ''}`}>
          {highlightText(comment.text, search)}
        </p>
      )}

      <CommentActions
        likes={comment.likes}
        isLiked={comment.isLiked}
        isDeleted={comment.isDeleted}
        isPinned={comment.isPinned}
        hasReplies={hasReplies}
        areRepliesExpanded={areRepliesExpanded}
        canReply={canReply}
        onLike={() => onToggleLike(comment.id)}
        onReply={() => onToggleReplyBox(comment.id)}
        onEdit={() => onToggleEditMode(comment.id, comment.text)}
        onDelete={() => onDelete(comment.id)}
        onRestore={() => onRestore(comment.id)}
        onCopy={() => onCopy(comment.text)}
        onPin={() => onPin(comment.id)}
        onToggleReplies={() => onToggleReplies(comment.id)}
      />

      {isReplyBoxOpen ? (
        <div className={styles.replyBox}>
          <CommentComposer
            value={replyDrafts[comment.id] ?? ''}
            placeholder={canReply ? 'Write a reply...' : 'Maximum depth reached'}
            submitLabel="Reply"
            label="Reply to comment"
            autoFocus
            onChange={(value) => onSetReplyDraft(comment.id, value)}
            onSubmit={() => onSubmitReply(comment.id)}
            onCancel={() => onCloseReplyBox(comment.id)}
          />
        </div>
      ) : null}

      {hasReplies && areRepliesExpanded ? (
        <div className={styles.replies} role="group" aria-label={`Replies to ${comment.author}`}>
          <CommentList
            comments={comment.children}
            level={level + 1}
            maxDepth={maxDepth}
            search={search}
            replyDrafts={replyDrafts}
            editDrafts={editDrafts}
            expandedMap={expandedMap}
            replyBoxMap={replyBoxMap}
            editModeMap={editModeMap}
            onSetReplyDraft={onSetReplyDraft}
            onSetEditDraft={onSetEditDraft}
            onToggleReplies={onToggleReplies}
            onToggleReplyBox={onToggleReplyBox}
            onCloseReplyBox={onCloseReplyBox}
            onToggleEditMode={onToggleEditMode}
            onCloseEditMode={onCloseEditMode}
            onSubmitReply={onSubmitReply}
            onSaveEdit={onSaveEdit}
            onDelete={onDelete}
            onRestore={onRestore}
            onToggleLike={onToggleLike}
            onPin={onPin}
            onCopy={onCopy}
          />
        </div>
      ) : null}
    </article>
  );
}

const CommentItem = memo(CommentItemComponent);
export default CommentItem;