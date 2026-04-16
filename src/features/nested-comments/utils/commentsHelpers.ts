import type { CommentNode } from '../types';

export const formatRelativeTime = (isoDate: string): string => {
  const date = new Date(isoDate).getTime();
  const now = Date.now();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

export const countComments = (comments: CommentNode[]): number => {
  return comments.reduce((acc, comment) => {
    return acc + 1 + countComments(comment.children);
  }, 0);
};

export const countVisibleComments = (comments: CommentNode[]): number => {
  return comments.reduce((acc, comment) => {
    if (comment.isDeleted) return acc;
    return acc + 1 + countVisibleComments(comment.children);
  }, 0);
};