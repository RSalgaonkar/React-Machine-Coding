import React from 'react';
import styles from '../styles/DecisionLab.module.css';
import { DecisionCategory, DecisionStatus } from '../types/decisionLab.types';

type StatusFilter = 'all' | DecisionStatus;
type CategoryFilter = 'all' | DecisionCategory;

interface DecisionToolbarProps {
  searchTerm: string;
  statusFilter: StatusFilter;
  categoryFilter: CategoryFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onCategoryChange: (value: CategoryFilter) => void;
  onOpenCreate: () => void;
}

function DecisionToolbar({
  searchTerm,
  statusFilter,
  categoryFilter,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onOpenCreate,
}: DecisionToolbarProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value as StatusFilter);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value as CategoryFilter);
  };

  return (
    <section className={styles.surfaceCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeading}>Filters</h2>
          <p className={styles.sectionSubheading}>Search and narrow decision items</p>
        </div>
        <button type="button" className={styles.primaryButton} onClick={onOpenCreate}>
          + Add Proposal
        </button>
      </div>

      <div className={styles.toolbarGrid}>
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>Search proposals</label>
          <input
            className={styles.textInput}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search title, summary or tags"
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldLabel}>Status</label>
          <select
            className={styles.selectInput}
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="all">All statuses</option>
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="approved">Approved</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldLabel}>Category</label>
          <select
            className={styles.selectInput}
            value={categoryFilter}
            onChange={handleCategoryChange}
          >
            <option value="all">All categories</option>
            <option value="ux">UX</option>
            <option value="performance">Performance</option>
            <option value="architecture">Architecture</option>
            <option value="testing">Testing</option>
            <option value="api">API</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default DecisionToolbar;