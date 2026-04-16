import { describe, expect, it } from 'vitest';
import { checkboxTreeData } from '../data/treeData';
import {
  findNodeById,
  getDescendantIds,
  getExpandableNodeIds,
  getSelectionState,
} from './treeHelpers';

describe('treeHelpers', () => {
  it('returns descendant ids for a nested node', () => {
    const node = findNodeById(checkboxTreeData, 'react');
    expect(node).not.toBeNull();
    expect(getDescendantIds(node!)).toEqual([
      'react',
      'hooks',
      'context-api',
      'performance',
    ]);
  });

  it('returns expandable node ids', () => {
    const ids = getExpandableNodeIds(checkboxTreeData);
    expect(ids).toContain('frontend');
    expect(ids).toContain('react');
    expect(ids).toContain('backend');
  });

  it('returns checked state when all descendants are selected', () => {
    const node = findNodeById(checkboxTreeData, 'react')!;
    const selected = new Set(['react', 'hooks', 'context-api', 'performance']);
    expect(getSelectionState(node, selected)).toBe('checked');
  });

  it('returns indeterminate state when only some descendants are selected', () => {
    const node = findNodeById(checkboxTreeData, 'react')!;
    const selected = new Set(['hooks']);
    expect(getSelectionState(node, selected)).toBe('indeterminate');
  });

  it('returns unchecked state when no descendants are selected', () => {
    const node = findNodeById(checkboxTreeData, 'react')!;
    const selected = new Set<string>();
    expect(getSelectionState(node, selected)).toBe('unchecked');
  });
});