import { useState } from 'react';
import type { CreateTaskInput, TaskPriority } from '../types/workspace.types';
import styles from '../styles/workspace.module.css';

interface Props {
  onCreateTask: (input: CreateTaskInput) => void;
  isSubmitting: boolean;
}

export default function TaskComposer({ onCreateTask, isSubmitting }: Props) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    onCreateTask({ title: trimmed, priority });
    setTitle('');
    setPriority('medium');
  };

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h3>Add task</h3>
        <span className={styles.panelMeta}>Optimistic create</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.composerForm}>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a collaborative task"
        />
        <select
          className={styles.select}
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
        <button type="submit" className={styles.primaryButton} disabled={isSubmitting}>
          {isSubmitting ? 'Adding…' : 'Add Task'}
        </button>
      </form>
    </section>
  );
}