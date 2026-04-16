import type { CommentNode } from '../types';

export const filterCommentsByQuery = (
  comments: CommentNode[],
  query: string
): CommentNode[] => {
  const normalized = query.trim().toLowerCase();

  if (!normalized) return comments;

  const filterNode = (comment: CommentNode): CommentNode | null => {
    const selfMatches =
      comment.text.toLowerCase().includes(normalized) ||
      comment.author.toLowerCase().includes(normalized);

    const filteredChildren = comment.children
      .map(filterNode)
      .filter((item): item is CommentNode => item !== null);

    if (selfMatches || filteredChildren.length > 0) {
      return {
        ...comment,
        children: filteredChildren,
      };
    }

    return null;
  };

  return comments
    .map(filterNode)
    .filter((item): item is CommentNode => item !== null);
};