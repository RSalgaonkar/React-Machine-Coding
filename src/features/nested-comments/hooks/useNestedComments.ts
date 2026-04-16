import { useMemo, useReducer } from 'react';
import { commentsData } from '../data/commentsData';
import { nestedCommentsReducer } from '../reducer/nestedCommentsReducer';
import { filterCommentsByQuery } from '../utils/commentsFilter';
import {
  addReplyToComment,
  softDeleteComment,
  sortCommentsRecursively,
  toggleLikeOnComment,
  updateCommentText,
} from '../utils/commentsTree';
import type { CommentNode, NestedCommentsState } from '../types';

const initialState: NestedCommentsState = {
  comments: commentsData,
  search: '',
  sortBy: 'newest',
  replyDrafts: {},
  editDrafts: {},
  expandedMap: {},
  replyBoxMap: {},
  editModeMap: {},
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

  const setSearch = (value: string) => {
    dispatch({ type: 'SET_SEARCH', payload: value });
  };

  const setSortBy = (value: 'newest' | 'oldest' | 'most-liked') => {
    dispatch({ type: 'SET_SORT_BY', payload: value });
  };

  const setReplyDraft = (commentId: string, value: string) => {
    dispatch({
      type: 'SET_REPLY_DRAFTS',
      payload: {
        ...state.replyDrafts,
        [commentId]: value,
      },
    });
  };

  const setEditDraft = (commentId: string, value: string) => {
    dispatch({
      type: 'SET_EDIT_DRAFTS',
      payload: {
        ...state.editDrafts,
        [commentId]: value,
      },
    });
  };

  const toggleReplies = (commentId: string) => {
    dispatch({
      type: 'SET_EXPANDED_MAP',
      payload: {
        ...state.expandedMap,
        [commentId]: !state.expandedMap[commentId],
      },
    });
  };

  const toggleReplyBox = (commentId: string) => {
    dispatch({
      type: 'SET_REPLY_BOX_MAP',
      payload: {
        ...state.replyBoxMap,
        [commentId]: !state.replyBoxMap[commentId],
      },
    });
  };

  const toggleEditMode = (commentId: string, existingText?: string) => {
    dispatch({
      type: 'SET_EDIT_MODE_MAP',
      payload: {
        ...state.editModeMap,
        [commentId]: !state.editModeMap[commentId],
      },
    });

    if (existingText !== undefined && !state.editModeMap[commentId]) {
      dispatch({
        type: 'SET_EDIT_DRAFTS',
        payload: {
          ...state.editDrafts,
          [commentId]: existingText,
        },
      });
    }
  };

  const submitReply = (parentId: string) => {
    const text = state.replyDrafts[parentId]?.trim();
    if (!text) return;

    const reply: CommentNode = {
      id: crypto.randomUUID(),
      author: 'You',
      text,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      children: [],
    };

    dispatch({
      type: 'SET_COMMENTS',
      payload: addReplyToComment(state.comments, parentId, reply),
    });

    dispatch({
      type: 'SET_REPLY_DRAFTS',
      payload: {
        ...state.replyDrafts,
        [parentId]: '',
      },
    });

    dispatch({
      type: 'SET_REPLY_BOX_MAP',
      payload: {
        ...state.replyBoxMap,
        [parentId]: false,
      },
    });

    dispatch({
      type: 'SET_EXPANDED_MAP',
      payload: {
        ...state.expandedMap,
        [parentId]: true,
      },
    });
  };

  const saveEdit = (commentId: string) => {
    const nextText = state.editDrafts[commentId]?.trim();
    if (!nextText) return;

    dispatch({
      type: 'SET_COMMENTS',
      payload: updateCommentText(state.comments, commentId, nextText),
    });

    dispatch({
      type: 'SET_EDIT_MODE_MAP',
      payload: {
        ...state.editModeMap,
        [commentId]: false,
      },
    });
  };

  const deleteComment = (commentId: string) => {
    dispatch({
      type: 'SET_COMMENTS',
      payload: softDeleteComment(state.comments, commentId),
    });
  };

  const toggleLike = (commentId: string) => {
    dispatch({
      type: 'SET_COMMENTS',
      payload: toggleLikeOnComment(state.comments, commentId),
    });
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
      children: [],
    };

    dispatch({
      type: 'SET_COMMENTS',
      payload: [comment, ...state.comments],
    });
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
  };
};