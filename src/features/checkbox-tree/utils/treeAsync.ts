import type { TreeNode } from '../types';

export const updateNodeChildren = (
  nodes: TreeNode[],
  targetId: string,
  children: TreeNode[]
): TreeNode[] => {
  return nodes.map((node) => {
    if (node.id === targetId) {
      return {
        ...node,
        children,
        isChildrenLoaded: true,
      };
    }

    if (node.children?.length) {
      return {
        ...node,
        children: updateNodeChildren(node.children, targetId, children),
      };
    }

    return node;
  });
};

export const updateNodeLoadingState = (
  nodes: TreeNode[],
  targetId: string,
  partial: Partial<TreeNode>
): TreeNode[] => {
  return nodes.map((node) => {
    if (node.id === targetId) {
      return {
        ...node,
        ...partial,
      };
    }

    if (node.children?.length) {
      return {
        ...node,
        children: updateNodeLoadingState(node.children, targetId, partial),
      };
    }

    return node;
  });
};