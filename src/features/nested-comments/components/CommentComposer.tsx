import { KeyboardEvent, useId, useMemo, useState } from 'react';
import styles from './NestedComments.module.css';

interface Props {
  value?: string;
  placeholder?: string;
  submitLabel?: string;
  onSubmit: (value: string) => void;
  onCancel?: () => void;
  onChange?: (value: string) => void;
  label?: string;
  autoFocus?: boolean;
  maxLength?: number;
}

export default function CommentComposer({
  value,
  placeholder = 'Write a comment...',
  submitLabel = 'Post',
  onSubmit,
  onCancel,
  onChange,
  label = 'Comment input',
  autoFocus = false,
  maxLength = 240,
}: Props) {
  const [localValue, setLocalValue] = useState('');
  const textareaId = useId();

  const controlled = typeof value === 'string';
  const currentValue = controlled ? value : localValue;

  const remaining = useMemo(() => maxLength - currentValue.length, [currentValue, maxLength]);
  const isInvalid = !currentValue.trim() || currentValue.length > maxLength;

  const handleChange = (nextValue: string) => {
    if (controlled) {
      onChange?.(nextValue);
    } else {
      setLocalValue(nextValue);
    }
  };

  const handleSubmit = () => {
    if (isInvalid) return;

    onSubmit(currentValue);

    if (!controlled) {
      setLocalValue('');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onCancel?.();
      return;
    }

    if (event.key === 'Enter' && (event.ctrlKey || !event.shiftKey)) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.composer}>
      <label htmlFor={textareaId} className={styles.srOnly}>
        {label}
      </label>

      <textarea
        id={textareaId}
        className={styles.textarea}
        placeholder={placeholder}
        value={currentValue}
        autoFocus={autoFocus}
        maxLength={maxLength + 20}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        aria-invalid={isInvalid}
        aria-describedby={`${textareaId}-hint ${textareaId}-counter`}
      />

      <div className={styles.composerMeta}>
        <span id={`${textareaId}-hint`} className={styles.hintText}>
          Press Enter to submit, Shift+Enter for newline, Escape to cancel.
        </span>
        <span
          id={`${textareaId}-counter`}
          className={`${styles.counterText} ${remaining < 0 ? styles.counterDanger : ''}`}
        >
          {currentValue.length}/{maxLength}
        </span>
      </div>

      <div className={styles.composerActions}>
        <button type="button" className={styles.primaryBtn} onClick={handleSubmit} disabled={isInvalid}>
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