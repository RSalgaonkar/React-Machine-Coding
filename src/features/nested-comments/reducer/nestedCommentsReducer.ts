import type { NestedCommentsState } from '../types';
import type { NestedCommentsAction } from './nestedCommentsReducer.types';

export const nestedCommentsReducer = (
  state: NestedCommentsState,
  action: NestedCommentsAction
): NestedCommentsState => {
  switch (action.type) {
    case 'comments/set':
      return {
        ...state,
        comments: action.payload,
      };

    case 'search/set':
      return {
        ...state,
        search: action.payload,
      };

    case 'sort/set':
      return {
        ...state,
        sortBy: action.payload,
      };

    case 'replyDraft/set':
      return {
        ...state,
        replyDrafts: {
          ...state.replyDrafts,
          [action.payload.commentId]: action.payload.value,
        },
      };

    case 'replyDraft/clear':
      return {
        ...state,
        replyDrafts: {
          ...state.replyDrafts,
          [action.payload.commentId]: '',
        },
      };

    case 'editDraft/set':
      return {
        ...state,
        editDrafts: {
          ...state.editDrafts,
          [action.payload.commentId]: action.payload.value,
        },
      };

    case 'editDraft/clear':
      return {
        ...state,
        editDrafts: {
          ...state.editDrafts,
          [action.payload.commentId]: '',
        },
      };

    case 'replyBox/toggle':
      return {
        ...state,
        replyBoxMap: {
          ...state.replyBoxMap,
          [action.payload.commentId]: !state.replyBoxMap[action.payload.commentId],
        },
      };

    case 'replyBox/close':
      return {
        ...state,
        replyBoxMap: {
          ...state.replyBoxMap,
          [action.payload.commentId]: false,
        },
      };

    case 'editMode/toggle':
      return {
        ...state,
        editModeMap: {
          ...state.editModeMap,
          [action.payload.commentId]: !state.editModeMap[action.payload.commentId],
        },
      };

    case 'editMode/close':
      return {
        ...state,
        editModeMap: {
          ...state.editModeMap,
          [action.payload.commentId]: false,
        },
      };

    case 'expanded/toggle':
      return {
        ...state,
        expandedMap: {
          ...state.expandedMap,
          [action.payload.commentId]: !state.expandedMap[action.payload.commentId],
        },
      };

    case 'expanded/setMany':
      return {
        ...state,
        expandedMap: action.payload,
      };

    case 'activity/set':
      return {
        ...state,
        activity: action.payload,
      };

    case 'activity/clear':
      return {
        ...state,
        activity: {
          type: null,
          message: '',
          timestamp: null,
        },
      };

    default:
      return state;
  }
};