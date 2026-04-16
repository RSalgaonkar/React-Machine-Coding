import type { TreeNode } from '../types';

export type CheckboxTreeAction =
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FOCUSED_ID'; payload: string | null }
  | { type: 'SET_SELECTED_IDS'; payload: Set<string> }
  | { type: 'SET_EXPANDED_IDS'; payload: Set<string> }
  | { type: 'SET_LOADING_NODE_IDS'; payload: Set<string> }
  | { type: 'SET_TREE_DATA'; payload: TreeNode[] }
  | { type: 'RESET_SELECTED_IDS' };