import { useMemo, useState } from 'react';
import type { TreeNode } from '../types';
import {
  findNodeById,
  flattenVisibleTree,
  getDescendantIds,
  getExpandableNodeIds,
} from '../utils/treeHelpers';
import { filterTreeByQuery } from '../utils/treeSearch';

export const useCheckboxTree = (treeData: TreeNode[]) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(getExpandableNodeIds(treeData).slice(0, 1))
  );
  const [search, setSearch] = useState('');
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const filteredTree = useMemo(
    () => filterTreeByQuery(treeData, search),
    [treeData, search]
  );

  const visibleNodes = useMemo(
    () => flattenVisibleTree(filteredTree, expandedIds),
    [filteredTree, expandedIds]
  );

  const toggleExpand = (nodeId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
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
      const targetNode = findNodeById(treeData, id);
      return !targetNode?.disabled;
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

  const focusNext = () => {
    if (!visibleNodes.length) return;
    if (!focusedId) {
      setFocusedId(visibleNodes[0].id);
      return;
    }

    const currentIndex = visibleNodes.findIndex((node) => node.id === focusedId);
    const nextIndex = currentIndex < visibleNodes.length - 1 ? currentIndex + 1 : currentIndex;
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
    selectedIds,
    expandedIds,
    search,
    setSearch,
    focusedId,
    setFocusedId,
    filteredTree,
    visibleNodes,
    toggleExpand,
    expandAll,
    collapseAll,
    toggleCheck,
    focusNext,
    focusPrev,
    focusFirst,
    focusLast,
  };
};