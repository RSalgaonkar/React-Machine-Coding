import { useMemo, useState } from 'react';
import {
  mockActivities,
  mockParticipants,
  mockProposals,
} from '../data/mockDecisionLabData';
import {
  DecisionCategory,
  DecisionStatus,
  Proposal,
} from '../types/decisionLab.types';

const formatNewProposal = (proposal: Omit<Proposal, 'id' | 'createdAt' | 'votes' | 'commentCount' | 'watchers'>): Proposal => {
  return {
    ...proposal,
    id: `p-${Date.now()}`,
    createdAt: new Date().toISOString(),
    votes: { upvotes: 0, downvotes: 0 },
    commentCount: 0,
    watchers: 1,
  };
};

export function useDecisionLab() {
  const [proposals, setProposals] = useState(mockProposals);
  const [participants] = useState(mockParticipants);
  const [activities, setActivities] = useState(mockActivities);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(
    mockProposals[0]?.id ?? null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | DecisionStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | DecisionCategory>('all');

  const filteredProposals = useMemo(() => {
    return proposals.filter((proposal) => {
      const matchesSearch =
        proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        statusFilter === 'all' ? true : proposal.status === statusFilter;

      const matchesCategory =
        categoryFilter === 'all' ? true : proposal.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [proposals, searchTerm, statusFilter, categoryFilter]);

  const selectedProposal =
    proposals.find((proposal) => proposal.id === selectedProposalId) ?? null;

  const handleSelectProposal = (proposalId: string) => {
    setSelectedProposalId(proposalId);
  };

  const handleVote = (proposalId: string, type: 'up' | 'down') => {
    setProposals((current) =>
      current.map((proposal) =>
        proposal.id === proposalId
          ? {
              ...proposal,
              votes: {
                ...proposal.votes,
                upvotes:
                  type === 'up'
                    ? proposal.votes.upvotes + 1
                    : proposal.votes.upvotes,
                downvotes:
                  type === 'down'
                    ? proposal.votes.downvotes + 1
                    : proposal.votes.downvotes,
              },
            }
          : proposal
      )
    );

    const proposal = proposals.find((item) => item.id === proposalId);

    if (proposal) {
      setActivities((current) => [
        {
          id: `a-${Date.now()}`,
          proposalId,
          actorName: 'You',
          action: type === 'up' ? 'voted_up' : 'voted_down',
          message: `${
            type === 'up' ? 'Upvoted' : 'Downvoted'
          } proposal: ${proposal.title}`,
          timestamp: new Date().toISOString(),
        },
        ...current,
      ]);
    }
  };

  const handleStatusChange = (proposalId: string, status: DecisionStatus) => {
    setProposals((current) =>
      current.map((proposal) =>
        proposal.id === proposalId ? { ...proposal, status } : proposal
      )
    );

    const proposal = proposals.find((item) => item.id === proposalId);

    if (proposal) {
      setActivities((current) => [
        {
          id: `a-${Date.now()}`,
          proposalId,
          actorName: 'You',
          action: 'status_changed',
          message: `Changed status of "${proposal.title}" to ${status}`,
          timestamp: new Date().toISOString(),
        },
        ...current,
      ]);
    }
  };

  const handleCreateProposal = (
    payload: Omit<
      Proposal,
      'id' | 'createdAt' | 'votes' | 'commentCount' | 'watchers'
    >
  ) => {
    const proposal = formatNewProposal(payload);

    setProposals((current) => [proposal, ...current]);
    setSelectedProposalId(proposal.id);
    setActivities((current) => [
      {
        id: `a-${Date.now()}`,
        proposalId: proposal.id,
        actorName: 'You',
        action: 'created',
        message: `Created proposal: ${proposal.title}`,
        timestamp: new Date().toISOString(),
      },
      ...current,
    ]);
  };

  return {
    participants,
    proposals,
    filteredProposals,
    activities,
    selectedProposal,
    selectedProposalId,
    searchTerm,
    statusFilter,
    categoryFilter,
    setSearchTerm,
    setStatusFilter,
    setCategoryFilter,
    handleSelectProposal,
    handleVote,
    handleStatusChange,
    handleCreateProposal,
  };
}