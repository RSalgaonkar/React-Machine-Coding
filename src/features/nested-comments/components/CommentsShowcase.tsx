import { useMemo } from 'react';
import { useCommentsTheme } from '../hooks/useCommentsTheme';
import { useNestedComments } from '../hooks/useNestedComments';
import {
  countComments,
  countLeafComments,
  countTotalLikes,
  countVisibleComments,
} from '../utils/commentsHelpers';
import CommentComposer from './CommentComposer';
import CommentList from './CommentList';
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

  const totalComments = useMemo(() => countComments(comments), [comments]);
  const visibleComments = useMemo(() => countVisibleComments(comments), [comments]);
  const totalLikes = useMemo(() => countTotalLikes(comments), [comments]);
  const leafComments = useMemo(() => countLeafComments(comments), [comments]);

  return (
    <section
      className={styles.wrapper}
      data-theme={theme}
    >
      <CommentsHeader theme={theme} onToggleTheme={toggleTheme} />

      <CommentsStatsBar
        totalComments={totalComments}
        visibleComments={visibleComments}
        totalLikes={totalLikes}
        leafComments={leafComments}
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
        />
      </div>

      <div className={styles.panel}>
        <h3 className={styles.sectionTitle}>Comment Thread</h3>

        {filteredComments.length === 0 ? (
          <CommentsEmptyState hasSearch={Boolean(search.trim())} />
        ) : (
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
        )}
      </div>

      <CommentsDocsSection />
    </section>
  );
}