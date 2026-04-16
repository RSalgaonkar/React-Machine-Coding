import type { CommentNode } from '../types';

export const commentsData: CommentNode[] = [
  {
    id: '1',
    author: 'Rashmith',
    text: 'This React recursive comment thread is looking clean and scalable.',
    createdAt: '2026-04-16T10:00:00.000Z',
    likes: 4,
    isLiked: false,
    children: [
      {
        id: '1-1',
        author: 'Aman',
        text: 'Yes, reducer-based state will make it much easier to extend.',
        createdAt: '2026-04-16T10:15:00.000Z',
        likes: 2,
        isLiked: false,
        children: [
          {
            id: '1-1-1',
            author: 'Neha',
            text: 'Especially once edit, delete, and sorting are added.',
            createdAt: '2026-04-16T10:30:00.000Z',
            likes: 1,
            isLiked: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    author: 'Karan',
    text: 'Can we also support searching across nested replies?',
    createdAt: '2026-04-16T11:00:00.000Z',
    likes: 3,
    isLiked: false,
    children: [],
  },
];