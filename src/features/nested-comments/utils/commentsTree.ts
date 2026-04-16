import type { CommentNode, ExpandedMap, SortBy } from '../types';

export const MAX_COMMENT_DEPTH = 4;

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

export const restoreDeletedComment = (
  comments: CommentNode[],
  targetId: string
): CommentNode[] => {
  return comments.map((comment) => {
    if (comment.id === targetId) {
      return {
        ...comment,
        text: '[Restored comment — please edit content]',
        author: 'You',
        isDeleted: false,
      };
    }

    return {
      ...comment,
      children: restoreDeletedComment(comment.children, targetId),
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

export const togglePinRootComment = (
  comments: CommentNode[],
  targetId: string
): CommentNode[] => {
  return comments.map((comment) => {
    if (comment.id === targetId) {
      return {
        ...comment,
        isPinned: !comment.isPinned,
      };
    }

    return comment;
  });
};

export const sortCommentsRecursively = (
  comments: CommentNode[],
  sortBy: SortBy
): CommentNode[] => {
  const sorted = [...comments].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

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

export const getCommentDepth = (
  comments: CommentNode[],
  targetId: string,
  currentDepth = 0
): number | null => {
  for (const comment of comments) {
    if (comment.id === targetId) return currentDepth;

    const childDepth = getCommentDepth(comment.children, targetId, currentDepth + 1);
    if (childDepth !== null) return childDepth;
  }

  return null;
};

export const flattenComments = (comments: CommentNode[]): CommentNode[] => {
  return comments.flatMap((comment) => [comment, ...flattenComments(comment.children)]);
};

export const buildExpandedMapForAll = (
  comments: CommentNode[],
  expanded: boolean
): ExpandedMap => {
  return flattenComments(comments).reduce<ExpandedMap>((acc, comment) => {
    if (comment.children.length > 0) {
      acc[comment.id] = expanded;
    }
    return acc;
  }, {});
};