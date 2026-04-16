import type { TreeNode } from '../types';

export const filterTreeByQuery = (
  nodes: TreeNode[],
  query: string
): TreeNode[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return nodes;

  const filterNode = (node: TreeNode): TreeNode | null => {
    const selfMatches = node.label.toLowerCase().includes(normalizedQuery);
    const filteredChildren =
      node.children
        ?.map(filterNode)
        .filter((child): child is TreeNode => child !== null) ?? [];

    if (selfMatches || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren,
      };
    }

    return null;
  };

  return nodes
    .map(filterNode)
    .filter((node): node is TreeNode => node !== null);
};