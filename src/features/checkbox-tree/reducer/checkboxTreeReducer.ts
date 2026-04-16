import type { CheckboxTreeState } from '../types';
import type { CheckboxTreeAction } from './checkboxTreeReducer.types';

export const checkboxTreeReducer = (
  state: CheckboxTreeState,
  action: CheckboxTreeAction
): CheckboxTreeState => {
  switch (action.type) {
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload,
      };

    case 'SET_FOCUSED_ID':
      return {
        ...state,
        focusedId: action.payload,
      };

    case 'SET_SELECTED_IDS':
      return {
        ...state,
        selectedIds: action.payload,
      };

    case 'SET_EXPANDED_IDS':
      return {
        ...state,
        expandedIds: action.payload,
      };

    case 'SET_LOADING_NODE_IDS':
      return {
        ...state,
        loadingNodeIds: action.payload,
      };

    case 'SET_TREE_DATA':
      return {
        ...state,
        treeData: action.payload,
      };

    case 'RESET_SELECTED_IDS':
      return {
        ...state,
        selectedIds: new Set(),
      };

    default:
      return state;
  }
};