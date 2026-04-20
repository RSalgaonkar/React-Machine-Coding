import React from 'react';
import styles from '../styles/DecisionLab.module.css';

type DecisionStatus = 'draft' | 'review' | 'approved' | 'blocked';

interface Proposal {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  status: DecisionStatus;
  tags: string[];
  votes: { upvotes: number; downvotes: number };
  commentCount: number;
  watchers?: number;
}

interface ProposalDetailsProps {
  proposal: Proposal | null;
  onVote: (proposalId: string, voteType: 'up' | 'down') => void;
  onStatusChange: (proposalId: string, status: DecisionStatus) => void;
}

function ProposalDetails({ proposal, onVote, onStatusChange }: ProposalDetailsProps) {
  if (!proposal) {
    return (
      <section className={styles.surfaceCardTall}>
        <div className={styles.emptyStateTall}>
          <h3>Select a proposal</h3>
          <p>Choose one proposal from the board to review details and actions.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.surfaceCardTall}>
      <div className={styles.detailsTop}>
        <div className={styles.detailsTopMain}>
          <span className={styles.categoryBadge}>{proposal.category}</span>
          <h2 className={styles.detailsTitle}>{proposal.title}</h2>
          <p className={styles.detailsSubtitle}>{proposal.summary}</p>
        </div>

        <div className={styles.detailsSideControl}>
          <label className={styles.fieldLabel}>Workflow status</label>
          <select
            className={styles.selectInput}
            value={proposal.status}
            onChange={(e) => onStatusChange(proposal.id, e.target.value as DecisionStatus)}
          >
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="approved">Approved</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      <div className={styles.detailsSection}>
        <h3 className={styles.sectionMiniTitle}>Description</h3>
        <p className={styles.detailsBody}>{proposal.description}</p>

        <div className={styles.tagList}>
          {proposal.tags.map((tag) => (
            <span key={tag} className={styles.tagPill}>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricTile}>
          <span className={styles.metricLabel}>Upvotes</span>
          <strong>{proposal.votes.upvotes}</strong>
        </div>
        <div className={styles.metricTile}>
          <span className={styles.metricLabel}>Downvotes</span>
          <strong>{proposal.votes.downvotes}</strong>
        </div>
        <div className={styles.metricTile}>
          <span className={styles.metricLabel}>Comments</span>
          <strong>{proposal.commentCount}</strong>
        </div>
        <div className={styles.metricTile}>
          <span className={styles.metricLabel}>Watchers</span>
          <strong>{proposal.watchers ?? 0}</strong>
        </div>
      </div>

      <div className={styles.detailsActions}>
        <button type="button" className={styles.primaryButton} onClick={() => onVote(proposal.id, 'up')}>
          Upvote
        </button>
        <button type="button" className={styles.secondaryButton} onClick={() => onVote(proposal.id, 'down')}>
          Downvote
        </button>
      </div>
    </section>
  );
}

export default ProposalDetails;