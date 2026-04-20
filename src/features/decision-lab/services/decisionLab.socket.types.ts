import {
  ActivityItem,
  DecisionStatus,
  Participant,
  Proposal,
} from '../types/decisionLab.types';

export interface DecisionLabServerToClientEvents {
  'decision-lab:participants': (participants: Participant[]) => void;
  'decision-lab:activity': (activity: ActivityItem) => void;
  'decision-lab:proposal-created': (proposal: Proposal) => void;
  'decision-lab:proposal-status-changed': (payload: {
    proposalId: string;
    status: DecisionStatus;
    actorName: string;
    timestamp: string;
  }) => void;
  'decision-lab:proposal-voted': (payload: {
    proposalId: string;
    voteType: 'up' | 'down';
    actorName: string;
    timestamp: string;
  }) => void;
}

export interface DecisionLabClientToServerEvents {
  'decision-lab:join-room': (payload: { roomId: string; userId: string }) => void;
  'decision-lab:leave-room': (payload: { roomId: string; userId: string }) => void;
  'decision-lab:create-proposal': (proposal: Proposal) => void;
  'decision-lab:change-status': (payload: {
    proposalId: string;
    status: DecisionStatus;
  }) => void;
  'decision-lab:vote': (payload: { proposalId: string; voteType: 'up' | 'down' }) => void;
}