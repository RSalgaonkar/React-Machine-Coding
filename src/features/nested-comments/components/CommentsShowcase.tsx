import { nestedCommentsDocs } from '../docs/nestedCommentsDocs';
import { useCommentsTheme } from '../hooks/useCommentsTheme';
import { useNestedComments } from '../hooks/useNestedComments';
import { countComments, countVisibleComments } from '../utils/commentsHelpers';
import CommentComposer from './CommentComposer';
import CommentList from './CommentList';
import CommentsDocsSection from './CommentsDocsSection';
import CommentsEmptyState from './CommentsEmptyState';
import CommentsHeader from './CommentsHeader';
import CommentsStatsBar from './CommentsStatsBar';
import CommentsToolbar from './CommentsToolbar';
import styles from './NestedComments.module.css';

export default function CommentsShowcase() {
  const {
    comments,
    filteredComments,
    search,
    sortBy,
    replyDrafts,
    editDrafts,
    expandedMap,
    replyBoxMap,
    editModeMap,
    setSearch,
    setSortBy,
    setReplyDraft,
    setEditDraft,
    toggleReplies,
    toggleReplyBox,
    toggleEditMode,
    submitReply,
    saveEdit,
    deleteComment,
    toggleLike,
    addRootComment,
  } = useNestedComments();

  const { theme, toggleTheme } = useCommentsTheme();

  return (
    <div className={styles.showcase} data-theme={theme}>
      <CommentsHeader
        title="Advanced Nested Comments"
        subtitle="Recursive comment threads with reply, edit, delete, like, search, sorting, and theme support."
      />

      <CommentsToolbar
        search={search}
        sortBy={sortBy}
        theme={theme}
        onSearchChange={setSearch}
        onSortChange={setSortBy}
        onToggleTheme={toggleTheme}
      />

      <CommentsStatsBar
        totalComments={countComments(comments)}
        visibleComments={countVisibleComments(filteredComments)}
      />

      <CommentComposer
        placeholder="Write a root comment..."
        submitLabel="Add Comment"
        onSubmit={addRootComment}
      />

      {filteredComments.length ? (
        <CommentList
          comments={filteredComments}
          level={0}
          replyDrafts={replyDrafts}
          editDrafts={editDrafts}
          expandedMap={expandedMap}
          replyBoxMap={replyBoxMap}
          editModeMap={editModeMap}
          onSetReplyDraft={setReplyDraft}
          onSetEditDraft={setEditDraft}
          onToggleReplies={toggleReplies}
          onToggleReplyBox={toggleReplyBox}
          onToggleEditMode={toggleEditMode}
          onSubmitReply={submitReply}
          onSaveEdit={saveEdit}
          onDelete={deleteComment}
          onToggleLike={toggleLike}
        />
      ) : (
        <CommentsEmptyState
          title="No comments found"
          description="Try a different search query or add a new root comment."
        />
      )}

      <CommentsDocsSection items={nestedCommentsDocs} />
    </div>
  );
}