import type { CommentNode } from '../types';

export const addReplyToComment = (
  comments: CommentNode[],
  parentId: string,
  reply: CommentNode
): CommentNode[] => {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        children: [...comment.children, reply],
      };
    }

    return {
      ...comment,
      children: addReplyToComment(comment.children, parentId, reply),
    };
  });
};

export const updateCommentText = (
  comments: CommentNode[],
  targetId: string,
  nextText: string
): CommentNode[] => {
  return comments.map((comment) => {
    if (comment.id === targetId) {
      return {
        ...comment,
        text: nextText,
      };
    }

    return {
      ...comment,
      children: updateCommentText(comment.children, targetId, nextText),
    };
  });
};

export const softDeleteComment = (
  comments: CommentNode[],
  targetId: string
): CommentNode[] => {
  return comments.map((comment) => {
    if (comment.id === targetId) {
      return {
        ...comment,
        text: '[This comment was deleted]',
        author: 'Deleted User',
        isDeleted: true,
      };
    }

    return {
      ...comment,
      children: softDeleteComment(comment.children, targetId),
    };
  });
};

export const toggleLikeOnComment = (
  comments: CommentNode[],
  targetId: string
): CommentNode[] => {
  return comments.map((comment) => {
    if (comment.id === targetId) {
      const nextLiked = !comment.isLiked;

      return {
        ...comment,
        isLiked: nextLiked,
        likes: nextLiked ? comment.likes + 1 : Math.max(0, comment.likes - 1),
      };
    }

    return {
      ...comment,
      children: toggleLikeOnComment(comment.children, targetId),
    };
  });
};

export const sortCommentsRecursively = (
  comments: CommentNode[],
  sortBy: 'newest' | 'oldest' | 'most-liked'
): CommentNode[] => {
  const sorted = [...comments].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    return b.likes - a.likes;
  });

  return sorted.map((comment) => ({
    ...comment,
    children: sortCommentsRecursively(comment.children, sortBy),
  }));
};