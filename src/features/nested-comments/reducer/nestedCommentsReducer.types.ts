import type {
  ActivityState,
  CommentNode,
  EditDraftMap,
  EditModeMap,
  ExpandedMap,
  ReplyBoxMap,
  ReplyDraftMap,
  SortBy,
} from '../types';

export type NestedCommentsAction =
  | { type: 'comments/set'; payload: CommentNode[] }
  | { type: 'search/set'; payload: string }
  | { type: 'sort/set'; payload: SortBy }
  | { type: 'replyDraft/set'; payload: { commentId: string; value: string } }
  | { type: 'replyDraft/clear'; payload: { commentId: string } }
  | { type: 'editDraft/set'; payload: { commentId: string; value: string } }
  | { type: 'editDraft/clear'; payload: { commentId: string } }
  | { type: 'replyBox/toggle'; payload: { commentId: string } }
  | { type: 'replyBox/close'; payload: { commentId: string } }
  | { type: 'editMode/toggle'; payload: { commentId: string } }
  | { type: 'editMode/close'; payload: { commentId: string } }
  | { type: 'expanded/toggle'; payload: { commentId: string } }
  | { type: 'expanded/setMany'; payload: ExpandedMap }
  | { type: 'activity/set'; payload: ActivityState }
  | { type: 'activity/clear' };