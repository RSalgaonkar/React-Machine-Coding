import {
  ActivityItem,
  DecisionCategory,
  DecisionStatus,
  Participant,
  Proposal,
} from '../types/decisionLab.types';

export interface DecisionToast {
  id: string;
  tone: 'success' | 'info' | 'warning' | 'danger';
  title: string;
  message: string;
}

export type CreateProposalPayload = Omit<
  Proposal,
  'id' | 'createdAt' | 'votes' | 'commentCount' | 'watchers'
>;

export type DecisionLabAction =
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_STATUS_FILTER'; payload: 'all' | DecisionStatus }
  | { type: 'SET_CATEGORY_FILTER'; payload: 'all' | DecisionCategory }
  | { type: 'SELECT_PROPOSAL'; payload: string }
  | { type: 'CREATE_PROPOSAL_OPTIMISTIC'; payload: CreateProposalPayload }
  | {
      type: 'VOTE_PROPOSAL_OPTIMISTIC';
      payload: { proposalId: string; voteType: 'up' | 'down'; actorName?: string };
    }
  | {
      type: 'CHANGE_PROPOSAL_STATUS_OPTIMISTIC';
      payload: { proposalId: string; status: DecisionStatus; actorName?: string };
    }
  | { type: 'ADD_ACTIVITY'; payload: ActivityItem }
  | { type: 'SET_PARTICIPANTS'; payload: Participant[] }
  | { type: 'START_REPLAY' }
  | { type: 'STOP_REPLAY' }
  | { type: 'SET_REPLAY_CURSOR'; payload: number }
  | { type: 'STEP_REPLAY_FORWARD' }
  | { type: 'STEP_REPLAY_BACKWARD' }
  | { type: 'PUSH_TOAST'; payload: DecisionToast }
  | { type: 'DISMISS_TOAST'; payload: string };