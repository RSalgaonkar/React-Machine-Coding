export interface CommentNode {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  isDeleted?: boolean;
  isPinned?: boolean;
  children: CommentNode[];
}

export type CommentsTheme = 'light' | 'dark';
export type SortBy = 'newest' | 'oldest' | 'most-liked';
export type ActivityType =
  | 'added-root'
  | 'added-reply'
  | 'edited'
  | 'deleted'
  | 'restored'
  | 'liked'
  | 'pinned'
  | 'expanded-all'
  | 'collapsed-all'
  | 'copied';

export type ReplyDraftMap = Record<string, string>;
export type EditDraftMap = Record<string, string>;
export type ExpandedMap = Record<string, boolean>;
export type ReplyBoxMap = Record<string, boolean>;
export type EditModeMap = Record<string, boolean>;

export interface ActivityState {
  type: ActivityType | null;
  message: string;
  timestamp: number | null;
}

export interface NestedCommentsState {
  comments: CommentNode[];
  search: string;
  sortBy: SortBy;
  replyDrafts: ReplyDraftMap;
  editDrafts: EditDraftMap;
  expandedMap: ExpandedMap;
  replyBoxMap: ReplyBoxMap;
  editModeMap: EditModeMap;
  activity: ActivityState;
}