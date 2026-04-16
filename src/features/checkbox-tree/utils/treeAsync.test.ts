import { describe, expect, it } from 'vitest';
import { checkboxTreeData } from '../data/treeData';
import { updateNodeChildren } from './treeAsync';

describe('treeAsync', () => {
  it('injects async children into the target node', () => {
    const updated = updateNodeChildren(checkboxTreeData, 'databases', [
      { id: 'mongodb', label: 'MongoDB' },
    ]);

    const backend = updated.find((node) => node.id === 'backend');
    const databases = backend?.children?.find((node) => node.id === 'databases');

    expect(databases?.children).toEqual([{ id: 'mongodb', label: 'MongoDB' }]);
    expect(databases?.isChildrenLoaded).toBe(true);
  });
});