import { useEffect, useMemo, useReducer } from 'react';
import { commentsData } from '../data/commentsData';
import { nestedCommentsReducer } from '../reducer/nestedCommentsReducer';
import { filterCommentsByQuery } from '../utils/commentsFilter';
import {
  addReplyToComment,
  buildExpandedMapForAll,
  getCommentDepth,
  MAX_COMMENT_DEPTH,
  restoreDeletedComment,
  softDeleteComment,
  sortCommentsRecursively,
  toggleLikeOnComment,
  togglePinRootComment,
  updateCommentText,
} from '../utils/commentsTree';
import type { CommentNode, NestedCommentsState, SortBy } from '../types';

const initialState: NestedCommentsState = {
  comments: commentsData,
  search: '',
  sortBy: 'newest',
  replyDrafts: {},
  editDrafts: {},
  expandedMap: {},
  replyBoxMap: {},
  editModeMap: {},
  activity: {
    type: null,
    message: '',
    timestamp: null,
  },
};

export const useNestedComments = () => {
  const [state, dispatch] = useReducer(nestedCommentsReducer, initialState);

  const sortedComments = useMemo(
    () => sortCommentsRecursively(state.comments, state.sortBy),
    [state.comments, state.sortBy]
  );

  const filteredComments = useMemo(
    () => filterCommentsByQuery(sortedComments, state.search),
    [sortedComments, state.search]
  );

  useEffect(() => {
    if (!state.activity.timestamp) return;

    const timer = window.setTimeout(() => {
      dispatch({ type: 'activity/clear' });
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [state.activity.timestamp]);

  const setActivity = (type: NestedCommentsState['activity']['type'], message: string) => {
    dispatch({
      type: 'activity/set',
      payload: {
        type,
        message,
        timestamp: Date.now(),
      },
    });
  };

  const setSearch = (value: string) => {
    dispatch({ type: 'search/set', payload: value });
  };

  const setSortBy = (value: SortBy) => {
    dispatch({ type: 'sort/set', payload: value });
  };

  const setReplyDraft = (commentId: string, value: string) => {
    dispatch({
      type: 'replyDraft/set',
      payload: { commentId, value },
    });
  };

  const setEditDraft = (commentId: string, value: string) => {
    dispatch({
      type: 'editDraft/set',
      payload: { commentId, value },
    });
  };

  const toggleReplies = (commentId: string) => {
    dispatch({
      type: 'expanded/toggle',
      payload: { commentId },
    });
  };

  const expandAll = () => {
    dispatch({
      type: 'expanded/setMany',
      payload: buildExpandedMapForAll(state.comments, true),
    });
    setActivity('expanded-all', 'Expanded all replies');
  };

  const collapseAll = () => {
    dispatch({
      type: 'expanded/setMany',
      payload: buildExpandedMapForAll(state.comments, false),
    });
    setActivity('collapsed-all', 'Collapsed all replies');
  };

  const toggleReplyBox = (commentId: string) => {
    dispatch({
      type: 'replyBox/toggle',
      payload: { commentId },
    });
  };

  const closeReplyBox = (commentId: string) => {
    dispatch({
      type: 'replyBox/close',
      payload: { commentId },
    });
  };

  const toggleEditMode = (commentId: string, existingText?: string) => {
    dispatch({
      type: 'editMode/toggle',
      payload: { commentId },
    });

    if (existingText !== undefined) {
      dispatch({
        type: 'editDraft/set',
        payload: { commentId, value: existingText },
      });
    }
  };

  const closeEditMode = (commentId: string) => {
    dispatch({
      type: 'editMode/close',
      payload: { commentId },
    });
  };

  const submitReply = (parentId: string) => {
    const text = state.replyDrafts[parentId]?.trim();
    if (!text) return;

    const depth = getCommentDepth(state.comments, parentId) ?? 0;
    if (depth >= MAX_COMMENT_DEPTH) {
      setActivity('added-reply', `Reply limit reached. Max depth is ${MAX_COMMENT_DEPTH + 1} levels.`);
      return;
    }

    const reply: CommentNode = {
      id: crypto.randomUUID(),
      author: 'You',
      text,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      isPinned: false,
      children: [],
    };

    dispatch({
      type: 'comments/set',
      payload: addReplyToComment(state.comments, parentId, reply),
    });

    dispatch({
      type: 'replyDraft/clear',
      payload: { commentId: parentId },
    });

    dispatch({
      type: 'replyBox/close',
      payload: { commentId: parentId },
    });

    dispatch({
      type: 'expanded/setMany',
      payload: {
        ...state.expandedMap,
        [parentId]: true,
      },
    });

    setActivity('added-reply', 'Reply added successfully');
  };

  const saveEdit = (commentId: string) => {
    const nextText = state.editDrafts[commentId]?.trim();
    if (!nextText) return;

    dispatch({
      type: 'comments/set',
      payload: updateCommentText(state.comments, commentId, nextText),
    });

    dispatch({
      type: 'editMode/close',
      payload: { commentId },
    });

    setActivity('edited', 'Comment updated');
  };

  const deleteComment = (commentId: string) => {
    dispatch({
      type: 'comments/set',
      payload: softDeleteComment(state.comments, commentId),
    });

    setActivity('deleted', 'Comment deleted');
  };

  const restoreComment = (commentId: string) => {
    dispatch({
      type: 'comments/set',
      payload: restoreDeletedComment(state.comments, commentId),
    });

    setActivity('restored', 'Comment restored');
  };

  const toggleLike = (commentId: string) => {
    dispatch({
      type: 'comments/set',
      payload: toggleLikeOnComment(state.comments, commentId),
    });

    setActivity('liked', 'Reaction updated');
  };

  const addRootComment = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const comment: CommentNode = {
      id: crypto.randomUUID(),
      author: 'You',
      text: trimmed,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      isPinned: false,
      children: [],
    };

    dispatch({
      type: 'comments/set',
      payload: [comment, ...state.comments],
    });

    setActivity('added-root', 'New root comment added');
  };

  const pinRootComment = (commentId: string) => {
    dispatch({
      type: 'comments/set',
      payload: togglePinRootComment(state.comments, commentId),
    });

    setActivity('pinned', 'Pin state updated');
  };

  const copyCommentText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setActivity('copied', 'Comment text copied');
    } catch {
      setActivity('copied', 'Unable to copy comment text');
    }
  };

  return {
    comments: state.comments,
    filteredComments,
    search: state.search,
    sortBy: state.sortBy,
    replyDrafts: state.replyDrafts,
    editDrafts: state.editDrafts,
    expandedMap: state.expandedMap,
    replyBoxMap: state.replyBoxMap,
    editModeMap: state.editModeMap,
    activity: state.activity,
    maxDepth: MAX_COMMENT_DEPTH,
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
  };
};