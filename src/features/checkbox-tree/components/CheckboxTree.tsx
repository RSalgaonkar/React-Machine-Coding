import type { TreeNode } from '../types';
import AnimatedTreeChildren from './AnimatedTreeChildren';
import EmptyTreeState from './EmptyTreeState';
import TreeNodeRow from './TreeNodeRow';
import styles from './CheckboxTree.module.css';

interface Props {
  tree: TreeNode[];
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  focusedId: string | null;
  loadingNodeIds: Set<string>;
  onToggleExpand: (id: string) => void;
  onToggleCheck: (id: string, checked: boolean) => void;
  onFocus: (id: string) => void;
  onFocusNext: () => void;
  onFocusPrev: () => void;
  onFocusFirst: () => void;
  onFocusLast: () => void;
}

interface NodeListProps extends Omit<Props, 'tree'> {
  nodes: TreeNode[];
  level: number;
}

function NodeList({
  nodes,
  level,
  selectedIds,
  expandedIds,
  focusedId,
  loadingNodeIds,
  onToggleExpand,
  onToggleCheck,
  onFocus,
  onFocusNext,
  onFocusPrev,
  onFocusFirst,
  onFocusLast,
}: NodeListProps) {
  return (
    <>
      {nodes.map((node) => {
        const isExpanded = expandedIds.has(node.id);
        const isLoading = loadingNodeIds.has(node.id);
        const hasChildren = Boolean(node.children?.length || node.hasAsyncChildren);

        return (
          <div key={node.id}>
            <TreeNodeRow
              node={node}
              level={level}
              isExpanded={isExpanded}
              isFocused={focusedId === node.id}
              isLoading={isLoading}
              selectedIds={selectedIds}
              onToggleExpand={onToggleExpand}
              onToggleCheck={onToggleCheck}
              onFocus={onFocus}
            />

            {hasChildren && (
              <AnimatedTreeChildren isOpen={isExpanded}>
                {node.children?.length ? (
                  <NodeList
                    nodes={node.children}
                    level={level + 1}
                    selectedIds={selectedIds}
                    expandedIds={expandedIds}
                    focusedId={focusedId}
                    loadingNodeIds={loadingNodeIds}
                    onToggleExpand={onToggleExpand}
                    onToggleCheck={onToggleCheck}
                    onFocus={onFocus}
                    onFocusNext={onFocusNext}
                    onFocusPrev={onFocusPrev}
                    onFocusFirst={onFocusFirst}
                    onFocusLast={onFocusLast}
                  />
                ) : null}
              </AnimatedTreeChildren>
            )}
          </div>
        );
      })}
    </>
  );
}

export default function CheckboxTree(props: Props) {
  const { tree } = props;

  if (!tree.length) {
    return (
      <EmptyTreeState
        title="No matching nodes"
        description="Try a different search query to find tree items."
      />
    );
  }

  return (
    <div
      className={styles.treeRoot}
      role="tree"
      tabIndex={0}
      onKeyDown={(e) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            props.onFocusNext();
            break;
          case 'ArrowUp':
            e.preventDefault();
            props.onFocusPrev();
            break;
          case 'Home':
            e.preventDefault();
            props.onFocusFirst();
            break;
          case 'End':
            e.preventDefault();
            props.onFocusLast();
            break;
          default:
            break;
        }
      }}
    >
      <NodeList {...props} nodes={tree} level={1} />
    </div>
  );
}