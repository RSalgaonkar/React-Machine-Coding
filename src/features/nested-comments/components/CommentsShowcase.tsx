import { useMemo } from 'react';
import { useCommentsTheme } from '../hooks/useCommentsTheme';
import { useNestedComments } from '../hooks/useNestedComments';
import {
  countComments,
  countDeletedComments,
  countLeafComments,
  countPinnedComments,
  countTotalLikes,
  countVisibleComments,
} from '../utils/commentsHelpers';
import CommentComposer from './CommentComposer';
import CommentList from './CommentList';
import CommentsActivityBar from './CommentsActivityBar';
import CommentsDocsSection from './CommentsDocsSection';
import CommentsEmptyState from './CommentsEmptyState';
import CommentsHeader from './CommentsHeader';
import CommentsStatsBar from './CommentsStatsBar';
import CommentsToolbar from './CommentsToolbar';
import styles from './NestedComments.module.css';

export default function CommentsShowcase() {
  const { theme, toggleTheme } = useCommentsTheme();

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
    activity,
    maxDepth,
    setSearch,
    setSortBy,
    setReplyDraft,
    setEditDraft,
    toggleReplies,
    expandAll,
    collapseAll,
    toggleReplyBox,
    closeReplyBox,
    toggleEditMode,
    closeEditMode,
    submitReply,
    saveEdit,
    deleteComment,
    restoreComment,
    toggleLike,
    addRootComment,
    pinRootComment,
    copyCommentText,
  } = useNestedComments();

  const totalComments = useMemo(() => countComments(comments), [comments]);
  const visibleComments = useMemo(() => countVisibleComments(comments), [comments]);
  const totalLikes = useMemo(() => countTotalLikes(comments), [comments]);
  const leafComments = useMemo(() => countLeafComments(comments), [comments]);
  const deletedComments = useMemo(() => countDeletedComments(comments), [comments]);
  const pinnedComments = useMemo(() => countPinnedComments(comments), [comments]);

  return (
    <section className={styles.wrapper} data-theme={theme}>
      <CommentsHeader theme={theme} onToggleTheme={toggleTheme} />
      <CommentsActivityBar message={activity.message} />

      <CommentsStatsBar
        totalComments={totalComments}
        visibleComments={visibleComments}
        totalLikes={totalLikes}
        leafComments={leafComments}
        deletedComments={deletedComments}
        pinnedComments={pinnedComments}
      />

      <div className={styles.panel}>
        <h3 className={styles.sectionTitle}>Add Root Comment</h3>
        <CommentComposer
          placeholder="Start a new discussion..."
          submitLabel="Add Comment"
          label="Root comment input"
          onSubmit={addRootComment}
        />
      </div>

      <div className={styles.panel}>
        <CommentsToolbar
          search={search}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onSortChange={setSortBy}
          onExpandAll={expandAll}
          onCollapseAll={collapseAll}
        />
      </div>

      <div className={styles.panel}>
        <div className={styles.threadHeaderRow}>
          <h3 className={styles.sectionTitle}>Comment Thread</h3>
          <span className={styles.depthHint}>Max reply depth: {maxDepth + 1}</span>
        </div>

        {filteredComments.length === 0 ? (
          <CommentsEmptyState hasSearch={Boolean(search.trim())} />
        ) : (
          <div role="tree" aria-label="Nested comments thread" className={styles.treeRoot}>
            <CommentList
              comments={filteredComments}
              level={0}
              maxDepth={maxDepth}
              search={search}
              replyDrafts={replyDrafts}
              editDrafts={editDrafts}
              expandedMap={expandedMap}
              replyBoxMap={replyBoxMap}
              editModeMap={editModeMap}
              onSetReplyDraft={setReplyDraft}
              onSetEditDraft={setEditDraft}
              onToggleReplies={toggleReplies}
              onToggleReplyBox={toggleReplyBox}
              onCloseReplyBox={closeReplyBox}
              onToggleEditMode={toggleEditMode}
              onCloseEditMode={closeEditMode}
              onSubmitReply={submitReply}
              onSaveEdit={saveEdit}
              onDelete={deleteComment}
              onRestore={restoreComment}
              onToggleLike={toggleLike}
              onPin={pinRootComment}
              onCopy={copyCommentText}
            />
          </div>
        )}
      </div>

      <CommentsDocsSection />
    </section>
  );
}