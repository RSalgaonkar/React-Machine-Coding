import { ActivityItem, Participant, Proposal } from '../types/decisionLab.types';

export const mockParticipants: Participant[] = [
  {
    id: 'p1',
    name: 'Rashmith',
    role: 'Frontend Developer',
    avatar: 'RS',
    focusArea: 'Decision UX',
    isOnline: true,
  },
  {
    id: 'p2',
    name: 'Aarti',
    role: 'Product Manager',
    avatar: 'AA',
    focusArea: 'Prioritization',
    isOnline: true,
  },
  {
    id: 'p3',
    name: 'Neha',
    role: 'QA Engineer',
    avatar: 'NK',
    focusArea: 'Validation',
    isOnline: false,
  },
  {
    id: 'p4',
    name: 'Arun',
    role: 'Backend Developer',
    avatar: 'AR',
    focusArea: 'Socket Contracts',
    isOnline: true,
  },
];

export const mockProposals: Proposal[] = [
  {
    id: 'proposal-1',
    title: 'Adopt optimistic voting for proposal decisions',
    summary: 'Improve decision responsiveness with immediate local updates.',
    description:
      'Introduce optimistic actions for voting and status changes so the UI feels instant. Later, add rollback support when socket or API confirmations fail.',
    category: 'ux',
    status: 'review',
    createdBy: 'Rashmith',
    createdAt: '2026-04-20T15:30:00.000Z',
    tags: ['react', 'ux', 'optimistic-ui'],
    assignees: ['Rashmith', 'Aarti'],
    votes: {
      upvotes: 18,
      downvotes: 2,
    },
    commentCount: 5,
    watchers: 9,
  },
  {
    id: 'proposal-2',
    title: 'Replay timeline for proposal history',
    summary: 'Allow step-by-step playback of the activity rail.',
    description:
      'Replay mode should help reviewers understand how a proposal evolved across votes, comments, and status transitions.',
    category: 'architecture',
    status: 'approved',
    createdBy: 'Aarti',
    createdAt: '2026-04-20T14:15:00.000Z',
    tags: ['timeline', 'replay', 'state-machine'],
    assignees: ['Aarti', 'Arun'],
    votes: {
      upvotes: 14,
      downvotes: 1,
    },
    commentCount: 3,
    watchers: 6,
  },
  {
    id: 'proposal-3',
    title: 'Socket-ready activity sync layer',
    summary: 'Prepare frontend contracts for realtime event streams.',
    description:
      'Add a typed service abstraction so the reducer and components do not depend directly on Socket.IO implementation details.',
    category: 'api',
    status: 'draft',
    createdBy: 'Arun',
    createdAt: '2026-04-20T13:50:00.000Z',
    tags: ['socket', 'typescript', 'service-layer'],
    assignees: ['Arun'],
    votes: {
      upvotes: 9,
      downvotes: 0,
    },
    commentCount: 2,
    watchers: 4,
  },
];

export const mockActivities: ActivityItem[] = [
  {
    id: 'activity-1',
    proposalId: 'proposal-1',
    actorName: 'Rashmith',
    action: 'created',
    message: 'Created proposal: Adopt optimistic voting for proposal decisions',
    timestamp: '2026-04-20T15:30:00.000Z',
  },
  {
    id: 'activity-2',
    proposalId: 'proposal-2',
    actorName: 'Aarti',
    action: 'status_changed',
    message: 'Marked replay timeline proposal as approved',
    timestamp: '2026-04-20T16:00:00.000Z',
  },
  {
    id: 'activity-3',
    proposalId: 'proposal-1',
    actorName: 'Neha',
    action: 'commented',
    message: 'Requested reconciliation handling for failed optimistic votes',
    timestamp: '2026-04-20T16:30:00.000Z',
  },
  {
    id: 'activity-4',
    proposalId: 'proposal-1',
    actorName: 'Rashmith',
    action: 'voted_up',
    message: 'Upvoted Bootstrap 4 layout refresh proposal',
    timestamp: '2026-04-20T16:45:00.000Z',
  },
];