import { describe, expect, it } from 'vitest';
import { checkboxTreeData } from '../data/treeData';
import { filterTreeByQuery } from './treeSearch';

describe('treeSearch', () => {
  it('returns full tree for empty search', () => {
    const result = filterTreeByQuery(checkboxTreeData, '');
    expect(result.length).toBe(checkboxTreeData.length);
  });

  it('preserves ancestor nodes for nested matches', () => {
    const result = filterTreeByQuery(checkboxTreeData, 'hooks');
    expect(result[0].label).toBe('Frontend');
    expect(result[0].children?.[0].label).toBe('React');
    expect(result[0].children?.[0].children?.[0].label).toBe('Hooks');
  });

  it('returns empty array for unknown query', () => {
    const result = filterTreeByQuery(checkboxTreeData, 'graphql');
    expect(result).toEqual([]);
  });
});