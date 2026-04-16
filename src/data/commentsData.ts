import type { CommentNode } from '../types';

export const commentsData: CommentNode[] = [
  {
    id: '1',
    author: 'Rashmith',
    text: 'This is the root comment.',
    children: [
      {
        id: '1-1',
        author: 'Aman',
        text: 'This is a nested reply.',
        children: [],
      },
    ],
  },
];