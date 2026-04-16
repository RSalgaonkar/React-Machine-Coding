export const getTreeItemAriaLabel = ({
  author,
  level,
  hasReplies,
  isDeleted,
}: {
  author: string;
  level: number;
  hasReplies: boolean;
  isDeleted?: boolean;
}) => {
  const parts = [
    `Comment by ${author}`,
    `Level ${level + 1}`,
    hasReplies ? 'Has replies' : 'No replies',
    isDeleted ? 'Deleted comment' : 'Active comment',
  ];

  return parts.join(', ');
};