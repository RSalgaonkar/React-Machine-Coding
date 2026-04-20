import React, { useMemo, useState } from 'react';
import styles from '../styles/DecisionLab.module.css';
import ParticipantStrip from '../components/ParticipantStrip';
import ReplayControls from '../components/ReplayControls';
import DecisionToolbar from '../components/DecisionToolbar';
import ProposalBoard from '../components/ProposalBoard';
import ProposalDetails from '../components/ProposalDetails';
import ActivityTimeline from '../components/ActivityTimeline';
import ToastViewport from '../components/ToastViewport';
import CreateProposalModal from '../components/CreateProposalModal';
import {
  CreateProposalFormValues,
  CreateProposalPayload,
} from '../types/decisionLab.types';
import { useDecisionLabReducer } from '../hooks/useDecisionLabReducer';

function DecisionLabPage() {
  const { state, dispatch, filteredProposals, selectedProposal, visibleActivities } =
    useDecisionLabReducer();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const onlineCount = useMemo(
    () => state.participants.filter((person) => person.isOnline).length,
    [state.participants]
  );

  return (
    <div className={styles.pageShell}>
      <ToastViewport
        toasts={state.toasts}
        onDismiss={(id) => dispatch({ type: 'DISMISS_TOAST', payload: id })}
      />

      <div className={styles.pageContainer}>
        <section className={styles.pageHero}>
          <div className={styles.pageHeroMain}>
            <span className={styles.eyebrow}>Collaborative workspace</span>
            <h1 className={styles.pageTitle}>Decision Lab</h1>
            <p className={styles.pageSubtitle}>
              Review proposals, track live activity, and manage decision flow in one place.
            </p>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStatCard}>
              <span className={styles.heroStatValue}>{state.participants.length}</span>
              <span className={styles.heroStatLabel}>Participants</span>
            </div>
            <div className={styles.heroStatCard}>
              <span className={styles.heroStatValue}>{onlineCount}</span>
              <span className={styles.heroStatLabel}>Online</span>
            </div>
            <div className={styles.heroStatCard}>
              <span className={styles.heroStatValue}>{state.proposals.length}</span>
              <span className={styles.heroStatLabel}>Proposals</span>
            </div>
          </div>
        </section>

        <ParticipantStrip participants={state.participants} />

        <div className={styles.topUtilityGrid}>
          <ReplayControls
            replay={state.replay}
            totalSteps={state.activities.length}
            onStart={() => dispatch({ type: 'START_REPLAY' })}
            onStop={() => dispatch({ type: 'STOP_REPLAY' })}
            onPrev={() => dispatch({ type: 'STEP_REPLAY_BACKWARD' })}
            onNext={() => dispatch({ type: 'STEP_REPLAY_FORWARD' })}
            onSeek={(value) => dispatch({ type: 'SET_REPLAY_CURSOR', payload: value })}
          />

          <DecisionToolbar
            searchTerm={state.searchTerm}
            statusFilter={state.statusFilter}
            categoryFilter={state.categoryFilter}
            onSearchChange={(value) => dispatch({ type: 'SET_SEARCH_TERM', payload: value })}
            onStatusChange={(value) => dispatch({ type: 'SET_STATUS_FILTER', payload: value })}
            onCategoryChange={(value) => dispatch({ type: 'SET_CATEGORY_FILTER', payload: value })}
            onOpenCreate={() => setIsCreateOpen(true)}
          />
        </div>

        <section className={styles.workspaceGrid}>
          <aside className={styles.leftRail}>
            <ProposalBoard
              proposals={filteredProposals}
              selectedProposalId={state.selectedProposalId}
              onSelectProposal={(id) => dispatch({ type: 'SELECT_PROPOSAL', payload: id })}
            />
          </aside>

          <main className={styles.centerStage}>
            <ProposalDetails
              proposal={selectedProposal}
              onVote={(proposalId, voteType) =>
                dispatch({
                  type: 'VOTE_PROPOSAL_OPTIMISTIC',
                  payload: { proposalId, voteType, actorName: 'You' },
                })
              }
              onStatusChange={(proposalId, status) =>
                dispatch({
                  type: 'CHANGE_PROPOSAL_STATUS_OPTIMISTIC',
                  payload: { proposalId, status, actorName: 'You' },
                })
              }
            />
          </main>

          <aside className={styles.rightRail}>
            <ActivityTimeline activities={visibleActivities} />
          </aside>
        </section>
      </div>

      <CreateProposalModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={(formValues: CreateProposalFormValues) => {
          const payload: CreateProposalPayload = {
            ...formValues,
            status: 'draft',
            createdBy: 'You',
            tags: [],
            assignees: [],
          };

          dispatch({ type: 'CREATE_PROPOSAL_OPTIMISTIC', payload });
          setIsCreateOpen(false);
        }}
      />
    </div>
  );
}

export default DecisionLabPage;