import { useEffect, useRef } from 'react';
import type { TreeNode } from '../types';
import { getSelectionState } from '../utils/treeHelpers';
import AnimatedTreeChildren from './AnimatedTreeChildren';
import styles from './CheckboxTree.module.css';

interface Props {
  node: TreeNode;
  level: number;
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  focusedId: string | null;
  onFocus: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onToggleCheck: (id: string, checked: boolean) => void;
  onArrowDown: () => void;
  onArrowUp: () => void;
  onHome: () => void;
  onEnd: () => void;
}

export default function TreeNodeRow({
  node,
  level,
  selectedIds,
  expandedIds,
  focusedId,
  onFocus,
  onToggleExpand,
  onToggleCheck,
  onArrowDown,
  onArrowUp,
  onHome,
  onEnd,
}: Props) {
  const hasChildren = Boolean(node.children?.length);
  const isExpanded = expandedIds.has(node.id);
  const selectionState = getSelectionState(node, selectedIds);
  const isChecked = selectionState === 'checked';
  const isIndeterminate = selectionState === 'indeterminate';
  const isFocused = focusedId === node.id;

  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  useEffect(() => {
    if (isFocused) {
      rowRef.current?.focus();
    }
  }, [isFocused]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        onArrowDown();
        break;
      case 'ArrowUp':
        e.preventDefault();
        onArrowUp();
        break;
      case 'ArrowRight':
        if (hasChildren && !isExpanded) {
          e.preventDefault();
          onToggleExpand(node.id);
        }
        break;
      case 'ArrowLeft':
        if (hasChildren && isExpanded) {
          e.preventDefault();
          onToggleExpand(node.id);
        }
        break;
      case 'Home':
        e.preventDefault();
        onHome();
        break;
      case 'End':
        e.preventDefault();
        onEnd();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!node.disabled) {
          onToggleCheck(node.id, !isChecked);
        }
        break;
    }
  };

  return (
    <div>
      <div
        ref={rowRef}
        className={`${styles.row} ${isFocused ? styles.focusedRow : ''} ${
          node.disabled ? styles.disabledRow : ''
        }`}
        role="treeitem"
        aria-level={level}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-checked={isIndeterminate ? 'mixed' : isChecked}
        tabIndex={isFocused ? 0 : -1}
        onFocus={() => onFocus(node.id)}
        onKeyDown={handleKeyDown}
        style={{ paddingLeft: `${(level - 1) * 20}px` }}
      >
        <button
          type="button"
          className={styles.expandBtn}
          onClick={() => hasChildren && onToggleExpand(node.id)}
          aria-label={isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
          disabled={!hasChildren}
        >
          {hasChildren ? (isExpanded ? '▾' : '▸') : '•'}
        </button>

        <label className={styles.label}>
          <input
            ref={checkboxRef}
            type="checkbox"
            checked={isChecked}
            disabled={node.disabled}
            onChange={(e) => onToggleCheck(node.id, e.target.checked)}
          />
          <span>{node.label}</span>
        </label>
      </div>

      {hasChildren && (
        <AnimatedTreeChildren isVisible={isExpanded}>
          <div role="group">
            {node.children!.map((child) => (
              <TreeNodeRow
                key={child.id}
                node={child}
                level={level + 1}
                selectedIds={selectedIds}
                expandedIds={expandedIds}
                focusedId={focusedId}
                onFocus={onFocus}
                onToggleExpand={onToggleExpand}
                onToggleCheck={onToggleCheck}
                onArrowDown={onArrowDown}
                onArrowUp={onArrowUp}
                onHome={onHome}
                onEnd={onEnd}
              />
            ))}
          </div>
        </AnimatedTreeChildren>
      )}
    </div>
  );
}