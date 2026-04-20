import { describe, expect, it } from 'vitest';
import { decisionLabReducer, initialDecisionLabState } from '../reducer/decisionLab.reducer';

describe('decisionLabReducer', () => {
  it('creates a proposal optimistically', () => {
    const state = decisionLabReducer(initialDecisionLabState, {
      type: 'CREATE_PROPOSAL_OPTIMISTIC',
      payload: {
        title: 'New Decision',
        summary: 'Short summary',
        description: 'Detailed description',
        category: 'ux',
        status: 'draft',
        createdBy: 'You',
        tags: ['react'],
        assignees: ['You'],
      },
    });

    expect(state.proposals[0].title).toBe('New Decision');
    expect(state.activities[0].action).toBe('created');
    expect(state.toasts[0].title).toBe('Proposal created');
  });

  it('votes optimistically', () => {
    const target = initialDecisionLabState.proposals[0];

    const state = decisionLabReducer(initialDecisionLabState, {
      type: 'VOTE_PROPOSAL_OPTIMISTIC',
      payload: { proposalId: target.id, voteType: 'up', actorName: 'You' },
    });

    const updated = state.proposals.find((proposal) => proposal.id === target.id);
    expect(updated?.votes.upvotes).toBe(target.votes.upvotes + 1);
    expect(state.activities[0].action).toBe('voted_up');
  });

  it('changes status optimistically', () => {
    const target = initialDecisionLabState.proposals[0];

    const state = decisionLabReducer(initialDecisionLabState, {
      type: 'CHANGE_PROPOSAL_STATUS_OPTIMISTIC',
      payload: { proposalId: target.id, status: 'approved', actorName: 'You' },
    });

    const updated = state.proposals.find((proposal) => proposal.id === target.id);
    expect(updated?.status).toBe('approved');
    expect(state.activities[0].action).toBe('status_changed');
  });

  it('starts replay from beginning', () => {
    const state = decisionLabReducer(initialDecisionLabState, {
      type: 'START_REPLAY',
    });

    expect(state.replay.isReplayMode).toBe(true);
    expect(state.replay.isPlaying).toBe(true);
    expect(state.replay.cursor).toBe(0);
  });

  it('steps replay forward', () => {
    const replayState = decisionLabReducer(initialDecisionLabState, {
      type: 'START_REPLAY',
    });

    const nextState = decisionLabReducer(replayState, {
      type: 'STEP_REPLAY_FORWARD',
    });

    expect(nextState.replay.cursor).toBe(1);
  });
});