import type {
  CommentNode,
  EditDraftMap,
  EditModeMap,
  ExpandedMap,
  ReplyBoxMap,
  ReplyDraftMap,
} from '../types';

export type NestedCommentsAction =
  | { type: 'SET_COMMENTS'; payload: CommentNode[] }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_SORT_BY'; payload: 'newest' | 'oldest' | 'most-liked' }
  | { type: 'SET_REPLY_DRAFTS'; payload: ReplyDraftMap }
  | { type: 'SET_EDIT_DRAFTS'; payload: EditDraftMap }
  | { type: 'SET_EXPANDED_MAP'; payload: ExpandedMap }
  | { type: 'SET_REPLY_BOX_MAP'; payload: ReplyBoxMap }
  | { type: 'SET_EDIT_MODE_MAP'; payload: EditModeMap };