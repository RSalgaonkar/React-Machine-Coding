import { mockActivities, mockParticipants, mockProposals } from '../data/mockDecisionLabData';
import {
  ActivityItem,
  DecisionCategory,
  DecisionStatus,
  Proposal,
} from '../types/decisionLab.types';
import { CreateProposalPayload, DecisionLabAction, DecisionToast } from './decisionLab.actions';

const buildProposalFromPayload = (payload: CreateProposalPayload): Proposal => ({
  ...payload,
  id: `proposal-${Date.now()}`,
  createdAt: new Date().toISOString(),
  votes: { upvotes: 0, downvotes: 0 },
  commentCount: 0,
  watchers: 1,
});

const buildActivity = (
  proposalId: string,
  actorName: string,
  action: ActivityItem['action'],
  message: string
): ActivityItem => ({
  id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  proposalId,
  actorName,
  action,
  message,
  timestamp: new Date().toISOString(),
});

const buildToast = (
  tone: DecisionToast['tone'],
  title: string,
  message: string
): DecisionToast => ({
  id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  tone,
  title,
  message,
});

export interface DecisionLabFeatureState {
  proposals: Proposal[];
  participants: typeof mockParticipants;
  activities: ActivityItem[];
  selectedProposalId: string | null;
  searchTerm: string;
  statusFilter: 'all' | DecisionStatus;
  categoryFilter: 'all' | DecisionCategory;
  replay: {
    isReplayMode: boolean;
    isPlaying: boolean;
    cursor: number;
  };
  toasts: DecisionToast[];
}

export const initialDecisionLabState: DecisionLabFeatureState = {
  proposals: mockProposals,
  participants: mockParticipants,
  activities: mockActivities,
  selectedProposalId: mockProposals[0]?.id ?? null,
  searchTerm: '',
  statusFilter: 'all',
  categoryFilter: 'all',
  replay: {
    isReplayMode: false,
    isPlaying: false,
    cursor: Math.max(mockActivities.length - 1, 0),
  },
  toasts: [],
};

export function decisionLabReducer(
  state: DecisionLabFeatureState,
  action: DecisionLabAction
): DecisionLabFeatureState {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };

    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload };

    case 'SET_CATEGORY_FILTER':
      return { ...state, categoryFilter: action.payload };

    case 'SELECT_PROPOSAL':
      return { ...state, selectedProposalId: action.payload };

    case 'CREATE_PROPOSAL_OPTIMISTIC': {
      const proposal = buildProposalFromPayload(action.payload);
      const activity = buildActivity(
        proposal.id,
        'You',
        'created',
        `Created proposal: ${proposal.title}`
      );
      const toast = buildToast(
        'success',
        'Proposal created',
        `"${proposal.title}" was added to Decision Lab.`
      );

      return {
        ...state,
        proposals: [proposal, ...state.proposals],
        activities: [activity, ...state.activities],
        selectedProposalId: proposal.id,
        toasts: [toast, ...state.toasts].slice(0, 4),
      };
    }

    case 'VOTE_PROPOSAL_OPTIMISTIC': {
      const target = state.proposals.find(
        (proposal) => proposal.id === action.payload.proposalId
      );

      if (!target) return state;

      const actorName = action.payload.actorName ?? 'You';

      const proposals = state.proposals.map((proposal) =>
        proposal.id === action.payload.proposalId
          ? {
              ...proposal,
              votes: {
                ...proposal.votes,
                upvotes:
                  action.payload.voteType === 'up'
                    ? proposal.votes.upvotes + 1
                    : proposal.votes.upvotes,
                downvotes:
                  action.payload.voteType === 'down'
                    ? proposal.votes.downvotes + 1
                    : proposal.votes.downvotes,
              },
            }
          : proposal
      );

      const activity = buildActivity(
        target.id,
        actorName,
        action.payload.voteType === 'up' ? 'voted_up' : 'voted_down',
        `${
          action.payload.voteType === 'up' ? 'Upvoted' : 'Downvoted'
        } proposal: ${target.title}`
      );

      const toast = buildToast(
        'info',
        'Vote recorded',
        `${actorName} ${
          action.payload.voteType === 'up' ? 'upvoted' : 'downvoted'
        } "${target.title}".`
      );

      return {
        ...state,
        proposals,
        activities: [activity, ...state.activities],
        toasts: [toast, ...state.toasts].slice(0, 4),
      };
    }

    case 'CHANGE_PROPOSAL_STATUS_OPTIMISTIC': {
      const target = state.proposals.find(
        (proposal) => proposal.id === action.payload.proposalId
      );

      if (!target) return state;

      const actorName = action.payload.actorName ?? 'You';

      const proposals = state.proposals.map((proposal) =>
        proposal.id === action.payload.proposalId
          ? { ...proposal, status: action.payload.status }
          : proposal
      );

      const activity = buildActivity(
        target.id,
        actorName,
        'status_changed',
        `Changed status of "${target.title}" to ${action.payload.status}`
      );

      const toast = buildToast(
        'warning',
        'Status updated',
        `"${target.title}" moved to ${action.payload.status}.`
      );

      return {
        ...state,
        proposals,
        activities: [activity, ...state.activities],
        toasts: [toast, ...state.toasts].slice(0, 4),
      };
    }

    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [action.payload, ...state.activities],
      };

    case 'SET_PARTICIPANTS':
      return {
        ...state,
        participants: action.payload,
      };

    case 'START_REPLAY':
      return {
        ...state,
        replay: {
          ...state.replay,
          isReplayMode: true,
          isPlaying: true,
          cursor: 0,
        },
      };

    case 'STOP_REPLAY':
      return {
        ...state,
        replay: {
          ...state.replay,
          isReplayMode: false,
          isPlaying: false,
          cursor: Math.max(state.activities.length - 1, 0),
        },
      };

    case 'SET_REPLAY_CURSOR':
      return {
        ...state,
        replay: {
          ...state.replay,
          isReplayMode: true,
          cursor: Math.max(0, Math.min(action.payload, state.activities.length - 1)),
        },
      };

    case 'STEP_REPLAY_FORWARD':
      return {
        ...state,
        replay: {
          ...state.replay,
          isReplayMode: true,
          cursor: Math.min(state.replay.cursor + 1, state.activities.length - 1),
        },
      };

    case 'STEP_REPLAY_BACKWARD':
      return {
        ...state,
        replay: {
          ...state.replay,
          isReplayMode: true,
          cursor: Math.max(state.replay.cursor - 1, 0),
        },
      };

    case 'PUSH_TOAST':
      return {
        ...state,
        toasts: [action.payload, ...state.toasts].slice(0, 4),
      };

    case 'DISMISS_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };

    default:
      return state;
  }
}