import type { SelectedChip, TreeNode } from '../types';

export const flattenTreeNodes = (nodes: TreeNode[]): TreeNode[] => {
  const result: TreeNode[] = [];

  const walk = (items: TreeNode[]) => {
    for (const item of items) {
      result.push(item);
      if (item.children?.length) {
        walk(item.children);
      }
    }
  };

  walk(nodes);
  return result;
};

export const getSelectedChips = (
  nodes: TreeNode[],
  selectedIds: Set<string>
): SelectedChip[] => {
  const flatNodes = flattenTreeNodes(nodes);

  return flatNodes
    .filter((node) => selectedIds.has(node.id))
    .map((node) => ({
      id: node.id,
      label: node.label,
    }));
};