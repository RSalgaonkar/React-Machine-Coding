import type { NestedCommentsState } from '../types';
import type { NestedCommentsAction } from './nestedCommentsReducer.types';

export const nestedCommentsReducer = (
  state: NestedCommentsState,
  action: NestedCommentsAction
): NestedCommentsState => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload };

    case 'SET_SEARCH':
      return { ...state, search: action.payload };

    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };

    case 'SET_REPLY_DRAFTS':
      return { ...state, replyDrafts: action.payload };

    case 'SET_EDIT_DRAFTS':
      return { ...state, editDrafts: action.payload };

    case 'SET_EXPANDED_MAP':
      return { ...state, expandedMap: action.payload };

    case 'SET_REPLY_BOX_MAP':
      return { ...state, replyBoxMap: action.payload };

    case 'SET_EDIT_MODE_MAP':
      return { ...state, editModeMap: action.payload };

    default:
      return state;
  }
};