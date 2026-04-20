import React from 'react';
import ProposalCard from './ProposalCard';
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

interface ProposalBoardProps {
  proposals: Proposal[];
  selectedProposalId: string | null;
  onSelectProposal: (proposalId: string) => void;
}

function ProposalBoard({
  proposals,
  selectedProposalId,
  onSelectProposal,
}: ProposalBoardProps) {
  return (
    <section className={styles.surfaceCardTall}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeading}>Proposal Board</h2>
          <p className={styles.sectionSubheading}>Review and select a proposal</p>
        </div>
        <span className={styles.countBadge}>{proposals.length}</span>
      </div>

      <div className={styles.panelScroll}>
        {proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            isSelected={selectedProposalId === proposal.id}
            onSelect={onSelectProposal}
          />
        ))}
      </div>
    </section>
  );
}

export default ProposalBoard;