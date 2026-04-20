import React, { useState } from 'react';
import styles from '../styles/DecisionLab.module.css';
import { CreateProposalFormValues, DecisionCategory } from '../types/decisionLab.types';

interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: CreateProposalFormValues) => void;
}

const initialForm: CreateProposalFormValues = {
  title: '',
  summary: '',
  description: '',
  category: 'architecture',
};

function CreateProposalModal({ isOpen, onClose, onCreate }: CreateProposalModalProps) {
  const [form, setForm] = useState<CreateProposalFormValues>(initialForm);

  if (!isOpen) return null;

  const updateField = <K extends keyof CreateProposalFormValues>(
    key: K,
    value: CreateProposalFormValues[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(form);
    setForm(initialForm);
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>Create proposal</h2>
            <p className={styles.modalSubtitle}>Add a new decision item to the board.</p>
          </div>
          <button type="button" className={styles.modalClose} onClick={onClose}>
            ×
          </button>
        </div>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Title</label>
            <input
              className={styles.textInput}
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Summary</label>
            <input
              className={styles.textInput}
              value={form.summary}
              onChange={(e) => updateField('summary', e.target.value)}
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Description</label>
            <textarea
              className={styles.textArea}
              rows={5}
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Category</label>
            <select
              className={styles.selectInput}
              value={form.category}
              onChange={(e) => updateField('category', e.target.value as DecisionCategory)}
            >
              <option value="architecture">Architecture</option>
              <option value="ux">UX</option>
              <option value="performance">Performance</option>
              <option value="testing">Testing</option>
              <option value="api">API</option>
            </select>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.secondaryButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.primaryButton}>
              Create proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProposalModal;