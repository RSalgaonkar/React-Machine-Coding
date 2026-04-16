import type { TreeNode } from '../types';

export const asyncChildrenMap: Record<string, TreeNode[]> = {
  databases: [
    { id: 'mongodb', label: 'MongoDB' },
    { id: 'postgresql', label: 'PostgreSQL' },
    { id: 'redis', label: 'Redis' },
  ],
  cloud: [
    { id: 'aws', label: 'AWS' },
    { id: 'gcp', label: 'Google Cloud' },
    { id: 'vercel', label: 'Vercel' },
  ],
};