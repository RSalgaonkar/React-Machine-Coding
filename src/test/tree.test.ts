import { describe, expect, it } from 'vitest';
import { checkboxTreeData } from '../data/checkboxTreeData';
import {
  areAllChildrenSelected,
  areSomeChildrenSelected,
  getAllDescendantIds,
} from '../utils/tree';

describe('tree utilities', () => {
  it('returns all descendant ids including parent', () => {
    const node = checkboxTreeData[0];
    const ids = getAllDescendantIds(node);

    expect(ids).toEqual(['1', '1-1', '1-1-1', '1-1-2', '1-2', '1-2-1', '1-2-2']);
  });

  it('returns true when all descendants are selected', () => {
    const node = checkboxTreeData[0];
    const ids = getAllDescendantIds(node);
    const selected = new Set(ids);

    expect(areAllChildrenSelected(node, selected)).toBe(true);
  });

  it('returns true for partial selection', () => {
    const node = checkboxTreeData[0];
    const selected = new Set(['1-1-1']);

    expect(areSomeChildrenSelected(node, selected)).toBe(true);
    expect(areAllChildrenSelected(node, selected)).toBe(false);
  });
});