export type DecisionCategory =
  | 'ux'
  | 'performance'
  | 'architecture'
  | 'testing'
  | 'api';

export type DecisionStatus = 'draft' | 'review' | 'approved' | 'blocked';

export type ActivityAction =
  | 'created'
  | 'commented'
  | 'status_changed'
  | 'voted_up'
  | 'voted_down';

export interface ProposalVotes {
  upvotes: number;
  downvotes: number;
}

export interface Proposal {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: DecisionCategory;
  status: DecisionStatus;
  createdBy: string;
  createdAt: string;
  tags: string[];
  assignees: string[];
  votes: ProposalVotes;
  commentCount: number;
  watchers: number;
}

export interface ActivityItem {
  id: string;
  proposalId: string;
  actorName: string;
  action: ActivityAction;
  message: string;
  timestamp: string;
}

export interface Participant {
  id: string;
  name: string;
  role: string;
  avatar: string;
  focusArea: string;
  isOnline: boolean;
}

export interface ReplayState {
  isReplayMode: boolean;
  isPlaying: boolean;
  cursor: number;
}

export interface DecisionLabState {
  proposals: Proposal[];
  participants: Participant[];
  activities: ActivityItem[];
  selectedProposalId: string | null;
  searchTerm: string;
  statusFilter: 'all' | DecisionStatus;
  categoryFilter: 'all' | DecisionCategory;
  replay: ReplayState;
}

export interface CreateProposalFormValues {
  title: string;
  summary: string;
  description: string;
  category: DecisionCategory;
}

export interface CreateProposalPayload extends CreateProposalFormValues {
  status: DecisionStatus;
  createdBy: string;
  tags: string[];
  assignees: string[];
}