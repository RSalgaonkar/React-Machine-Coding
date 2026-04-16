import type { CommentNode } from '../types';

export function addReplyToTree(
  comments: CommentNode[],
  parentId: string,
  reply: CommentNode
): CommentNode[] {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        children: [...comment.children, reply],
      };
    }

    return {
      ...comment,
      children: addReplyToTree(comment.children, parentId, reply),
    };
  });
}