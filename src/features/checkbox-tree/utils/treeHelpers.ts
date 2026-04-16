import type { TreeNode, VisibleTreeNode } from '../types';

export const getDescendantIds = (node: TreeNode): string[] => {
  const ids = [node.id];

  if (node.children?.length) {
    for (const child of node.children) {
      ids.push(...getDescendantIds(child));
    }
  }

  return ids;
};

export const getExpandableNodeIds = (nodes: TreeNode[]): string[] => {
  const ids: string[] = [];

  const traverse = (items: TreeNode[]) => {
    for (const item of items) {
      if (item.children?.length) {
        ids.push(item.id);
        traverse(item.children);
      }
    }
  };

  traverse(nodes);
  return ids;
};

export const findNodeById = (
  nodes: TreeNode[],
  targetId: string
): TreeNode | null => {
  for (const node of nodes) {
    if (node.id === targetId) return node;
    if (node.children?.length) {
      const found = findNodeById(node.children, targetId);
      if (found) return found;
    }
  }
  return null;
};

export const flattenVisibleTree = (
  nodes: TreeNode[],
  expandedIds: Set<string>,
  level = 1,
  parentId: string | null = null
): VisibleTreeNode[] => {
  const result: VisibleTreeNode[] = [];

  for (const node of nodes) {
    const hasChildren = Boolean(node.children?.length);
    const isExpanded = expandedIds.has(node.id);

    result.push({
      id: node.id,
      label: node.label,
      level,
      parentId,
      hasChildren,
      isExpanded,
      disabled: node.disabled,
      originalNode: node,
    });

    if (hasChildren && isExpanded) {
      result.push(
        ...flattenVisibleTree(node.children!, expandedIds, level + 1, node.id)
      );
    }
  }

  return result;
};

export const getSelectionState = (
  node: TreeNode,
  selectedIds: Set<string>
): 'checked' | 'unchecked' | 'indeterminate' => {
  const ids = getDescendantIds(node).filter(Boolean);
  const selectedCount = ids.filter((id) => selectedIds.has(id)).length;

  if (selectedCount === 0) return 'unchecked';
  if (selectedCount === ids.length) return 'checked';
  return 'indeterminate';
};