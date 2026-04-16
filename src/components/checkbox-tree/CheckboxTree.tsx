import { useState } from 'react';
import type { TreeNode } from '../../types';
import { getAllDescendantIds } from '../../utils/tree';
import TreeNodeItem from './TreeNodeItem';

export default function CheckboxTree({ data }: { data: TreeNode[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleToggle = (node: TreeNode, checked: boolean) => {
    const ids = getAllDescendantIds(node);

    setSelectedIds((prev) => {
      const next = new Set(prev);

      ids.forEach((id) => {
        if (checked) next.add(id);
        else next.delete(id);
      });

      return next;
    });
  };

  return (
    <div>
      {data.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          selectedIds={selectedIds}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}