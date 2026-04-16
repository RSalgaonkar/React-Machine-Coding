import type { TreeNode } from '../types';

export function getAllDescendantIds(node: TreeNode): string[] {
  const ids = [node.id];

  node.children?.forEach((child) => {
    ids.push(...getAllDescendantIds(child));
  });

  return ids;
}

export function areAllChildrenSelected(
  node: TreeNode,
  selectedIds: Set<string>
): boolean {
  const ids = getAllDescendantIds(node);
  return ids.every((id) => selectedIds.has(id));
}

export function areSomeChildrenSelected(
  node: TreeNode,
  selectedIds: Set<string>
): boolean {
  const ids = getAllDescendantIds(node);
  const selectedCount = ids.filter((id) => selectedIds.has(id)).length;
  return selectedCount > 0 && selectedCount < ids.length;
}