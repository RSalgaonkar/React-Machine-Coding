import { useState } from 'react';
import styles from './NestedComments.module.css';

interface Props {
  value?: string;
  placeholder?: string;
  submitLabel?: string;
  onSubmit: (value: string) => void;
  onCancel?: () => void;
  onChange?: (value: string) => void;
}

export default function CommentComposer({
  value,
  placeholder = 'Write a comment...',
  submitLabel = 'Post',
  onSubmit,
  onCancel,
  onChange,
}: Props) {
  const [localValue, setLocalValue] = useState('');

  const controlled = typeof value === 'string';
  const currentValue = controlled ? value : localValue;

  const handleChange = (nextValue: string) => {
    if (controlled) {
      onChange?.(nextValue);
    } else {
      setLocalValue(nextValue);
    }
  };

  const handleSubmit = () => {
    onSubmit(currentValue);
    if (!controlled) {
      setLocalValue('');
    }
  };

  return (
    <div className={styles.composer}>
      <textarea
        className={styles.textarea}
        placeholder={placeholder}
        value={currentValue}
        onChange={(e) => handleChange(e.target.value)}
        rows={3}
      />

      <div className={styles.composerActions}>
        <button type="button" className={styles.primaryBtn} onClick={handleSubmit}>
          {submitLabel}
        </button>
        {onCancel ? (
          <button type="button" className={styles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </div>
  );
}