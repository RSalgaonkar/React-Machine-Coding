import { useEffect, useRef } from 'react';
import type { TreeNode } from '../types';
import { getSelectionState } from '../utils/treeHelpers';
import LoadingNodeBadge from './LoadingNodeBadge';
import styles from './CheckboxTree.module.css';

interface Props {
  node: TreeNode;
  level: number;
  isExpanded: boolean;
  isFocused: boolean;
  isLoading: boolean;
  selectedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  onToggleCheck: (id: string, checked: boolean) => void;
  onFocus: (id: string) => void;
}

export default function TreeNodeRow({
  node,
  level,
  isExpanded,
  isFocused,
  isLoading,
  selectedIds,
  onToggleExpand,
  onToggleCheck,
  onFocus,
}: Props) {
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const selectionState = getSelectionState(node, selectedIds);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = selectionState === 'indeterminate';
    }
  }, [selectionState]);

  const hasChildren = Boolean(node.children?.length || node.hasAsyncChildren);

  return (
    <div
      className={`${styles.nodeRow} ${isFocused ? styles.nodeRowFocused : ''} ${
        node.disabled ? styles.nodeRowDisabled : ''
      }`}
      style={{ paddingLeft: `${level * 20}px` }}
      onClick={() => onFocus(node.id)}
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-disabled={node.disabled || undefined}
      aria-level={level}
    >
      <div className={styles.nodeMain}>
        {hasChildren ? (
          <button
            type="button"
            className={styles.expandBtn}
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(node.id);
            }}
            aria-label={isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
          >
            {isExpanded ? '▾' : '▸'}
          </button>
        ) : (
          <span className={styles.expandPlaceholder} />
        )}

        <input
          ref={checkboxRef}
          type="checkbox"
          checked={selectionState === 'checked'}
          disabled={node.disabled}
          onChange={(e) => onToggleCheck(node.id, e.target.checked)}
          onClick={(e) => e.stopPropagation()}
        />

        <span className={styles.nodeLabel}>{node.label}</span>

        {isLoading && <LoadingNodeBadge />}
        {node.disabled && <span className={styles.disabledBadge}>Disabled</span>}
      </div>
    </div>
  );
}