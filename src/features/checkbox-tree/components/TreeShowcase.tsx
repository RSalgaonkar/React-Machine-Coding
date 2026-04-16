import { checkboxTreeData } from '../data/treeData';
import { checkboxTreeDocs } from '../docs/checkboxTreeDocs';
import { useCheckboxTree } from '../hooks/useCheckboxTree';
import { useCheckboxTreeTheme } from '../hooks/useCheckboxTreeTheme';
import { countAllNodes } from '../utils/treeHelpers';
import CheckboxTree from './CheckboxTree';
import SelectedChipsPanel from './SelectedChipsPanel';
import TreeDocsSection from './TreeDocsSection';
import TreeHeader from './TreeHeader';
import TreeStatsBar from './TreeStatsBar';
import TreeToolbar from './TreeToolbar';
import styles from './CheckboxTree.module.css';

export default function TreeShowcase() {
  const {
    treeDataState,
    loadingNodeIds,
    search,
    setSearch,
    selectedIds,
    expandedIds,
    focusedId,
    setFocusedId,
    filteredTree,
    visibleNodes,
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
  } = useCheckboxTree(checkboxTreeData);

  const { theme, toggleTheme } = useCheckboxTreeTheme();

  return (
    <div className={styles.showcase} data-theme={theme}>
      <TreeHeader
        title="Advanced Checkbox Tree"
        subtitle="Recursive selection, indeterminate state, async expansion, keyboard navigation, theme support, and URL-synced state."
      />

      <TreeToolbar
        search={search}
        onSearchChange={setSearch}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <TreeStatsBar
        totalNodes={countAllNodes(treeDataState)}
        visibleNodes={visibleNodes.length}
        selectedCount={selectedIds.size}
      />

      <SelectedChipsPanel
        chips={selectedChips}
        onRemove={removeSelectedChip}
        onClearAll={clearAllSelected}
      />

      <CheckboxTree
        tree={filteredTree}
        selectedIds={selectedIds}
        expandedIds={expandedIds}
        focusedId={focusedId}
        loadingNodeIds={loadingNodeIds}
        onToggleExpand={toggleExpand}
        onToggleCheck={toggleCheck}
        onFocus={setFocusedId}
        onFocusNext={focusNext}
        onFocusPrev={focusPrev}
        onFocusFirst={focusFirst}
        onFocusLast={focusLast}
      />

      <TreeDocsSection items={checkboxTreeDocs} />
    </div>
  );
}