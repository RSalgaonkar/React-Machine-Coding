import type { SelectedChip, TreeNode } from '../types';

export const getSelectedChips = (
  nodes: TreeNode[],
  selectedIds: Set<string>
): SelectedChip[] => {
  const chips: SelectedChip[] = [];

  const walk = (items: TreeNode[]) => {
    items.forEach((item) => {
      if (selectedIds.has(item.id)) {
        chips.push({
          id: item.id,
          label: item.label,
        });
      }

      if (item.children?.length) {
        walk(item.children);
      }
    });
  };

  walk(nodes);
  return chips;
};