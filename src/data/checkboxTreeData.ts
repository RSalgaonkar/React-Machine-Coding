import type { TreeNode } from '../types';

export const checkboxTreeData: TreeNode[] = [
  {
    id: '1',
    label: 'Frontend',
    children: [
      {
        id: '1-1',
        label: 'React',
        children: [
          { id: '1-1-1', label: 'Hooks' },
          { id: '1-1-2', label: 'Context API' },
        ],
      },
      {
        id: '1-2',
        label: 'TypeScript',
        children: [
          { id: '1-2-1', label: 'Generics' },
          { id: '1-2-2', label: 'Utility Types' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Backend',
    children: [
      { id: '2-1', label: 'Node.js' },
      { id: '2-2', label: 'Express' },
    ],
  },
];