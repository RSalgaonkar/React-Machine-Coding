import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { TreeNode } from '../types';
import {
  findNodeById,
  flattenVisibleTree,
  getDescendantIds,
  getExpandableNodeIds,
} from '../utils/treeHelpers';
import { filterTreeByQuery } from '../utils/treeSearch';
import { getSelectedChips } from '../utils/treeSelection';
import { parseCsvParam, stringifyCsvParam, uniqueValues } from '../utils/urlState';

export const useCheckboxTree = (treeData: TreeNode[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(parseCsvParam(searchParams.get('selected')))
  );
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(
      parseCsvParam(searchParams.get('expanded')).length
        ? parseCsvParam(searchParams.get('expanded'))
        : getExpandableNodeIds(treeData).slice(0, 1)
    )
  );
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const filteredTree = useMemo(
    () => filterTreeByQuery(treeData, search),
    [treeData, search]
  );

  const visibleNodes = useMemo(
    () => flattenVisibleTree(filteredTree, expandedIds),
    [filteredTree, expandedIds]
  );

  const selectedChips = useMemo(
    () => getSelectedChips(treeData, selectedIds),
    [treeData, selectedIds]
  );

  useEffect(() => {
    const nextSelected = stringifyCsvParam(uniqueValues([...selectedIds]));
    const nextExpanded = stringifyCsvParam(uniqueValues([...expandedIds]));

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (search.trim()) params.set('q', search.trim());
      else params.delete('q');

      if (nextSelected) params.set('selected', nextSelected);
      else params.delete('selected');

      if (nextExpanded) params.set('expanded', nextExpanded);
      else params.delete('expanded');

      return params;
    }, { replace: true });
  }, [search, selectedIds, expandedIds, setSearchParams]);

  useEffect(() => {
    if (!search.trim()) return;
    setExpandedIds(new Set(getExpandableNodeIds(filteredTree)));
  }, [search, filteredTree]);

  const toggleExpand = (nodeId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(getExpandableNodeIds(filteredTree)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const toggleCheck = (nodeId: string, checked: boolean) => {
    const node = findNodeById(treeData, nodeId);
    if (!node) return;

    const impactedIds = getDescendantIds(node);
    const enabledIds = impactedIds.filter((id) => {
      const item = findNodeById(treeData, id);
      return !item?.disabled;
    });

    setSelectedIds((prev) => {
      const next = new Set(prev);
      enabledIds.forEach((id) => {
        if (checked) next.add(id);
        else next.delete(id);
      });
      return next;
    });
  };

  const clearAllSelected = () => {
    setSelectedIds(new Set());
  };

  const removeSelectedChip = (nodeId: string) => {
    const node = findNodeById(treeData, nodeId);
    if (!node) return;

    const impactedIds = getDescendantIds(node);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      impactedIds.forEach((id) => next.delete(id));
      return next;
    });
  };

  const focusNext = () => {
    if (!visibleNodes.length) return;
    if (!focusedId) {
      setFocusedId(visibleNodes[0].id);
      return;
    }

    const currentIndex = visibleNodes.findIndex((node) => node.id === focusedId);
    const nextIndex =
      currentIndex < visibleNodes.length - 1 ? currentIndex + 1 : currentIndex;

    setFocusedId(visibleNodes[nextIndex].id);
  };

  const focusPrev = () => {
    if (!visibleNodes.length) return;
    if (!focusedId) {
      setFocusedId(visibleNodes[0].id);
      return;
    }

    const currentIndex = visibleNodes.findIndex((node) => node.id === focusedId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;

    setFocusedId(visibleNodes[prevIndex].id);
  };

  const focusFirst = () => {
    if (visibleNodes.length) setFocusedId(visibleNodes[0].id);
  };

  const focusLast = () => {
    if (visibleNodes.length) setFocusedId(visibleNodes[visibleNodes.length - 1].id);
  };

  return {
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
  };
};