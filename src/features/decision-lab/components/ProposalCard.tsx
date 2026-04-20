import React from 'react';
import styles from '../styles/DecisionLab.module.css';

interface Proposal {
  id: string;
  title: string;
  summary: string;
  status: 'draft' | 'review' | 'approved' | 'blocked';
  category: string;
  tags: string[];
  votes: { upvotes: number; downvotes: number };
  commentCount: number;
}

interface ProposalCardProps {
  proposal: Proposal;
  isSelected: boolean;
  onSelect: (proposalId: string) => void;
}

function ProposalCard({ proposal, isSelected, onSelect }: ProposalCardProps) {
  return (
    <button
      type="button"
      className={`${styles.proposalCard} ${isSelected ? styles.proposalCardActive : ''}`}
      onClick={() => onSelect(proposal.id)}
    >
      <div className={styles.proposalCardHeader}>
        <span className={styles.categoryBadge}>{proposal.category}</span>
        <span className={`${styles.statusBadge} ${styles[`status${proposal.status}`]}`}>
          {proposal.status}
        </span>
      </div>

      <h3 className={styles.proposalCardTitle}>{proposal.title}</h3>
      <p className={styles.proposalCardSummary}>{proposal.summary}</p>

      <div className={styles.tagList}>
        {proposal.tags.map((tag) => (
          <span key={tag} className={styles.tagPill}>
            #{tag}
          </span>
        ))}
      </div>

      <div className={styles.proposalCardFooter}>
        <span>▲ {proposal.votes.upvotes}</span>
        <span>▼ {proposal.votes.downvotes}</span>
        <span>{proposal.commentCount} comments</span>
      </div>
    </button>
  );
}

export default ProposalCard;