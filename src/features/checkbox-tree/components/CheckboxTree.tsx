import type { TreeNode } from '../types';
import { useCheckboxTree } from '../hooks/useCheckboxTree';
import { useCheckboxTreeTheme } from '../hooks/useCheckboxTreeTheme';
import SelectedChipsPanel from './SelectedChipsPanel';
import TreeNodeRow from './TreeNodeRow';
import TreeToolbar from './TreeToolbar';
import styles from './CheckboxTree.module.css';

interface Props {
  data: TreeNode[];
  title?: string;
}

export default function CheckboxTree({
  data,
  title = 'Production Checkbox Tree',
}: Props) {
  const {
    loadingNodeIds,
    search,
    setSearch,
    selectedIds,
    expandedIds,
    focusedId,
    setFocusedId,
    filteredTree,
    selectedChips,
    toggleExpand,
    expandAll,
    collapseAll,
    toggleCheck,
    clearAllSelected,
    removeSelectedChip,
    focusNext,
    focusPrev,
    focusFirst,
    focusLast,
  } = useCheckboxTree(data);

  const { theme, toggleTheme } = useCheckboxTreeTheme();

  return (
    <section className={`${styles.shell} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Portfolio Component</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            Accessible recursive tree with URL state, async loading,
            animated expansion, removable chips, and keyboard navigation.
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Selected</span>
            <strong className={styles.statValue}>{selectedIds.size}</strong>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Expanded</span>
            <strong className={styles.statValue}>{expandedIds.size}</strong>
          </div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.leftPane}>
          <TreeToolbar
            search={search}
            onSearchChange={setSearch}
            onExpandAll={expandAll}
            onCollapseAll={collapseAll}
            theme={theme}
            onToggleTheme={toggleTheme}
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
                  loadingNodeIds={loadingNodeIds}
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
                <p>Try a broader keyword or clear the search field.</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.rightPane}>
          <SelectedChipsPanel
            chips={selectedChips}
            onRemove={removeSelectedChip}
            onClearAll={clearAllSelected}
          />
        </div>
      </div>
    </section>
  );
}