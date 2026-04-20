import { DecisionLabFeatureState } from './decisionLab.reducer';

export const selectFilteredProposals = (state: DecisionLabFeatureState) => {
  return state.proposals.filter((proposal) => {
    const query = state.searchTerm.trim().toLowerCase();

    const matchesSearch =
      query.length === 0 ||
      proposal.title.toLowerCase().includes(query) ||
      proposal.summary.toLowerCase().includes(query) ||
      proposal.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesStatus =
      state.statusFilter === 'all' || proposal.status === state.statusFilter;

    const matchesCategory =
      state.categoryFilter === 'all' || proposal.category === state.categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });
};

export const selectSelectedProposal = (state: DecisionLabFeatureState) =>
  state.proposals.find((proposal) => proposal.id === state.selectedProposalId) ?? null;

export const selectVisibleActivities = (state: DecisionLabFeatureState) =>
  state.replay.isReplayMode
    ? state.activities.slice(0, state.replay.cursor + 1)
    : state.activities;