export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
  hasAsyncChildren?: boolean;
  isChildrenLoaded?: boolean;
}

export interface VisibleTreeNode {
  id: string;
  label: string;
  level: number;
  parentId: string | null;
  hasChildren: boolean;
  isExpanded: boolean;
  disabled?: boolean;
  originalNode: TreeNode;
}

export interface SelectedChip {
  id: string;
  label: string;
}

export type TreeTheme = 'light' | 'dark';

export interface CheckboxTreeState {
  treeData: TreeNode[];
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  loadingNodeIds: Set<string>;
  search: string;
  focusedId: string | null;
}