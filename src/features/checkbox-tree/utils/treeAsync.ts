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