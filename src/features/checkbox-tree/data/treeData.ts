import type { TreeNode } from '../types';

export const checkboxTreeData: TreeNode[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    children: [
      {
        id: 'react',
        label: 'React',
        children: [
          { id: 'hooks', label: 'Hooks' },
          { id: 'context-api', label: 'Context API' },
          { id: 'performance', label: 'Performance Optimization' },
        ],
      },
      {
        id: 'typescript',
        label: 'TypeScript',
        children: [
          { id: 'generics', label: 'Generics' },
          { id: 'utility-types', label: 'Utility Types' },
        ],
      },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    children: [
      { id: 'nodejs', label: 'Node.js' },
      {
        id: 'databases',
        label: 'Databases',
        hasAsyncChildren: true,
        isChildrenLoaded: false,
      },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    children: [
      { id: 'docker', label: 'Docker' },
      { id: 'ci-cd', label: 'CI/CD', disabled: true },
      {
        id: 'cloud',
        label: 'Cloud',
        hasAsyncChildren: true,
        isChildrenLoaded: false,
      },
    ],
  },
];