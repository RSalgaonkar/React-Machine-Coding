export interface CommentNode {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  isDeleted?: boolean;
  children: CommentNode[];
}

export type CommentsTheme = 'light' | 'dark';

export type ReplyDraftMap = Record<string, string>;
export type EditDraftMap = Record<string, string>;
export type ExpandedMap = Record<string, boolean>;
export type ReplyBoxMap = Record<string, boolean>;
export type EditModeMap = Record<string, boolean>;

export interface NestedCommentsState {
  comments: CommentNode[];
  search: string;
  sortBy: 'newest' | 'oldest' | 'most-liked';
  replyDrafts: ReplyDraftMap;
  editDrafts: EditDraftMap;
  expandedMap: ExpandedMap;
  replyBoxMap: ReplyBoxMap;
  editModeMap: EditModeMap;
}