export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
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