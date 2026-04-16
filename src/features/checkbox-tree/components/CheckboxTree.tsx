import type { TreeNode } from '../types';
import { useCheckboxTree } from '../hooks/useCheckboxTree';
import TreeNodeRow from './TreeNodeRow';
import TreeToolbar from './TreeToolbar';
import styles from './CheckboxTree.module.css';

interface Props {
  data: TreeNode[];
  title?: string;
}

export default function CheckboxTree({
  data,
  title = 'Skill Explorer',
}: Props) {
  const {
    selectedIds,
    expandedIds,
    search,
    setSearch,
    focusedId,
    setFocusedId,
    filteredTree,
    toggleExpand,
    expandAll,
    collapseAll,
    toggleCheck,
    focusNext,
    focusPrev,
    focusFirst,
    focusLast,
  } = useCheckboxTree(data);

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            Recursive checkbox tree with search, keyboard support, and mixed states.
          </p>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Selected nodes</span>
          <strong className={styles.summaryValue}>{selectedIds.size}</strong>
        </div>
      </div>

      <TreeToolbar
        search={search}
        onSearchChange={setSearch}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
      />

      <div className={styles.treeContainer} role="tree" aria-label="Checkbox tree">
        {filteredTree.length ? (
          filteredTree.map((node) => (
            <TreeNodeRow
              key={node.id}
              node={node}
              level={1}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              focusedId={focusedId}
              onFocus={setFocusedId}
              onToggleExpand={toggleExpand}
              onToggleCheck={toggleCheck}
              onArrowDown={focusNext}
              onArrowUp={focusPrev}
              onHome={focusFirst}
              onEnd={focusLast}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3>No matching nodes</h3>
            <p>Try searching with a broader keyword like React, Node, or Database.</p>
          </div>
        )}
      </div>
    </section>
  );
}