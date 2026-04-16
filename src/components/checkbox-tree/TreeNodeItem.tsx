import type { TreeNode } from '../../types';
import {
  areAllChildrenSelected,
  areSomeChildrenSelected,
} from '../../utils/tree';

interface Props {
  node: TreeNode;
  selectedIds: Set<string>;
  onToggle: (node: TreeNode, checked: boolean) => void;
}

export default function TreeNodeItem({ node, selectedIds, onToggle }: Props) {
  const isChecked = areAllChildrenSelected(node, selectedIds);
  const isIndeterminate = areSomeChildrenSelected(node, selectedIds);

  return (
    <div className="mt-3">
      <label className="flex items-center gap-3 text-sm text-slate-800">
        <input
          type="checkbox"
          checked={isChecked}
          ref={(input) => {
            if (input) input.indeterminate = isIndeterminate;
          }}
          onChange={(e) => onToggle(node, e.target.checked)}
          className="h-4 w-4 rounded border-slate-300"
        />
        <span>{node.label}</span>
      </label>

      {node.children?.length ? (
        <div className="ml-6 mt-2 border-l border-dashed border-slate-300 pl-4">
          {node.children.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              selectedIds={selectedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}