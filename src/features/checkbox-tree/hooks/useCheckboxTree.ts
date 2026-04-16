import { useEffect, useMemo, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { CheckboxTreeState, TreeNode } from '../types';
import { asyncChildrenMap } from '../data/asyncChildren';
import { checkboxTreeReducer } from '../reducer/checkboxTreeReducer';
import {
  findNodeById,
  flattenVisibleTree,
  getDescendantIds,
  getExpandableNodeIds,
} from '../utils/treeHelpers';
import { filterTreeByQuery } from '../utils/treeSearch';
import { getSelectedChips } from '../utils/treeSelection';
import { updateNodeChildren } from '../utils/treeAsync';
import { parseCsvParam, stringifyCsvParam, uniqueValues } from '../utils/urlState';

const buildInitialState = (
  treeData: TreeNode[],
  selected: string[],
  expanded: string[],
  search: string
): CheckboxTreeState => ({
  treeData,
  selectedIds: new Set(selected),
  expandedIds: new Set(
    expanded.length ? expanded : getExpandableNodeIds(treeData).slice(0, 1)
  ),
  loadingNodeIds: new Set(),
  search,
  focusedId: null,
});

export const useCheckboxTree = (initialTreeData: TreeNode[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSelected = parseCsvParam(searchParams.get('selected'));
  const initialExpanded = parseCsvParam(searchParams.get('expanded'));
  const initialSearch = searchParams.get('q') ?? '';

  const [state, dispatch] = useReducer(
    checkboxTreeReducer,
    buildInitialState(initialTreeData, initialSelected, initialExpanded, initialSearch)
  );

  const filteredTree = useMemo(
    () => filterTreeByQuery(state.treeData, state.search),
    [state.treeData, state.search]
  );

  const visibleNodes = useMemo(
    () => flattenVisibleTree(filteredTree, state.expandedIds),
    [filteredTree, state.expandedIds]
  );

  const selectedChips = useMemo(
    () => getSelectedChips(state.treeData, state.selectedIds),
    [state.treeData, state.selectedIds]
  );

  useEffect(() => {
    const nextSelected = stringifyCsvParam(uniqueValues([...state.selectedIds]));
    const nextExpanded = stringifyCsvParam(uniqueValues([...state.expandedIds]));

    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);

        if (state.search.trim()) params.set('q', state.search.trim());
        else params.delete('q');

        if (nextSelected) params.set('selected', nextSelected);
        else params.delete('selected');

        if (nextExpanded) params.set('expanded', nextExpanded);
        else params.delete('expanded');

        return params;
      },
      { replace: true }
    );
  }, [state.search, state.selectedIds, state.expandedIds, setSearchParams]);

  useEffect(() => {
    if (!state.search.trim()) return;
    dispatch({
      type: 'SET_EXPANDED_IDS',
      payload: new Set(getExpandableNodeIds(filteredTree)),
    });
  }, [state.search, filteredTree]);

  const setSearch = (value: string) => {
    dispatch({ type: 'SET_SEARCH', payload: value });
  };

  const setFocusedId = (value: string | null) => {
    dispatch({ type: 'SET_FOCUSED_ID', payload: value });
  };

  const loadAsyncChildren = async (nodeId: string) => {
    const node = findNodeById(state.treeData, nodeId);
    if (!node || !node.hasAsyncChildren || node.isChildrenLoaded) return;

    const nextLoading = new Set(state.loadingNodeIds);
    nextLoading.add(nodeId);
    dispatch({ type: 'SET_LOADING_NODE_IDS', payload: nextLoading });

    await new Promise((resolve) => setTimeout(resolve, 700));

    const children = asyncChildrenMap[nodeId] ?? [];
    const nextTree = updateNodeChildren(state.treeData, nodeId, children);

    dispatch({ type: 'SET_TREE_DATA', payload: nextTree });

    const clearedLoading = new Set(nextLoading);
    clearedLoading.delete(nodeId);
    dispatch({ type: 'SET_LOADING_NODE_IDS', payload: clearedLoading });
  };

  const toggleExpand = async (nodeId: string) => {
    const node = findNodeById(state.treeData, nodeId);

    if (node?.hasAsyncChildren && !node.isChildrenLoaded) {
      await loadAsyncChildren(nodeId);
    }

    const next = new Set(state.expandedIds);

    if (next.has(nodeId)) next.delete(nodeId);
    else next.add(nodeId);

    dispatch({ type: 'SET_EXPANDED_IDS', payload: next });
  };

  const expandAll = () => {
    dispatch({
      type: 'SET_EXPANDED_IDS',
      payload: new Set(getExpandableNodeIds(filteredTree)),
    });
  };

  const collapseAll = () => {
    dispatch({
      type: 'SET_EXPANDED_IDS',
      payload: new Set(),
    });
  };

  const toggleCheck = (nodeId: string, checked: boolean) => {
    const node = findNodeById(state.treeData, nodeId);
    if (!node) return;

    const impactedIds = getDescendantIds(node);
    const enabledIds = impactedIds.filter((id) => {
      const item = findNodeById(state.treeData, id);
      return !item?.disabled;
    });

    const next = new Set(state.selectedIds);

    enabledIds.forEach((id) => {
      if (checked) next.add(id);
      else next.delete(id);
    });

    dispatch({ type: 'SET_SELECTED_IDS', payload: next });
  };

  const clearAllSelected = () => {
    dispatch({ type: 'RESET_SELECTED_IDS' });
  };

  const removeSelectedChip = (nodeId: string) => {
    const node = findNodeById(state.treeData, nodeId);
    if (!node) return;

    const impactedIds = getDescendantIds(node);
    const next = new Set(state.selectedIds);

    impactedIds.forEach((id) => next.delete(id));

    dispatch({ type: 'SET_SELECTED_IDS', payload: next });
  };

  const focusNext = () => {
    if (!visibleNodes.length) return;

    if (!state.focusedId) {
      dispatch({ type: 'SET_FOCUSED_ID', payload: visibleNodes[0].id });
      return;
    }

    const currentIndex = visibleNodes.findIndex((item) => item.id === state.focusedId);
    const nextIndex =
      currentIndex < visibleNodes.length - 1 ? currentIndex + 1 : currentIndex;

    dispatch({ type: 'SET_FOCUSED_ID', payload: visibleNodes[nextIndex].id });
  };

  const focusPrev = () => {
    if (!visibleNodes.length) return;

    if (!state.focusedId) {
      dispatch({ type: 'SET_FOCUSED_ID', payload: visibleNodes[0].id });
      return;
    }

    const currentIndex = visibleNodes.findIndex((item) => item.id === state.focusedId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;

    dispatch({ type: 'SET_FOCUSED_ID', payload: visibleNodes[prevIndex].id });
  };

  const focusFirst = () => {
    if (!visibleNodes.length) return;
    dispatch({ type: 'SET_FOCUSED_ID', payload: visibleNodes[0].id });
  };

  const focusLast = () => {
    if (!visibleNodes.length) return;
    dispatch({
      type: 'SET_FOCUSED_ID',
      payload: visibleNodes[visibleNodes.length - 1].id,
    });
  };

  return {
    treeDataState: state.treeData,
    loadingNodeIds: state.loadingNodeIds,
    search: state.search,
    setSearch,
    selectedIds: state.selectedIds,
    expandedIds: state.expandedIds,
    focusedId: state.focusedId,
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
  };
};