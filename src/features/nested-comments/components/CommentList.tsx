import type { CommentNode } from '../types';
import CommentItem from './CommentItem';

interface Props {
  comments: CommentNode[];
  level: number;
  maxDepth: number;
  search: string;
  replyDrafts: Record<string, string>;
  editDrafts: Record<string, string>;
  expandedMap: Record<string, boolean>;
  replyBoxMap: Record<string, boolean>;
  editModeMap: Record<string, boolean>;
  onSetReplyDraft: (commentId: string, value: string) => void;
  onSetEditDraft: (commentId: string, value: string) => void;
  onToggleReplies: (commentId: string) => void;
  onToggleReplyBox: (commentId: string) => void;
  onCloseReplyBox: (commentId: string) => void;
  onToggleEditMode: (commentId: string, existingText?: string) => void;
  onCloseEditMode: (commentId: string) => void;
  onSubmitReply: (commentId: string) => void;
  onSaveEdit: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onRestore: (commentId: string) => void;
  onToggleLike: (commentId: string) => void;
  onPin: (commentId: string) => void;
  onCopy: (text: string) => void;
}

export default function CommentList(props: Props) {
  return (
    <>
      {props.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} {...props} />
      ))}
    </>
  );
}