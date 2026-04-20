import React, { useEffect, useMemo, useState } from 'react';
import type {
  Collaborator,
  TaskStatus,
  UpdateTaskInput,
  WorkspaceTask,
} from '../types/workspace.types';
import SyncStatusBadge from './SyncStatusBadge';
import styles from '../styles/workspace.module.css';

interface Props {
  task: WorkspaceTask;
  collaborators: Collaborator[];
  isSaving: boolean;
  isSelected: boolean;
  onSelect: (taskId: string) => void;
  onSave: (input: UpdateTaskInput) => void;
}

function TaskRowComponent({
  task,
  collaborators,
  isSaving,
  isSelected,
  onSelect,
  onSave,
}: Props) {
  const [draftTitle, setDraftTitle] = useState(task.title);

  useEffect(() => {
    setDraftTitle(task.title);
  }, [task.title]);

  const editor = useMemo(
    () => collaborators.find((user) => user.editingTaskId === task.id && !user.isYou),
    [collaborators, task.id]
  );

  const handleBlur = () => {
    const trimmed = draftTitle.trim();
    if (!trimmed || trimmed === task.title) return;

    onSave({
      taskId: task.id,
      patch: { title: trimmed },
      expectedVersion: task.version,
    });
  };

  const handleStatusChange = (nextStatus: TaskStatus) => {
    if (nextStatus === task.status) return;

    onSave({
      taskId: task.id,
      patch: { status: nextStatus },
      expectedVersion: task.version,
    });
  };

  return (
    <article
      className={`${styles.taskCard} ${isSelected ? styles.taskCardSelected : ''}`}
      onClick={() => onSelect(task.id)}
    >
      <div className={styles.taskTop}>
        <div className={styles.taskTitleWrap}>
          <input
            className={styles.taskTitleInput}
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onBlur={handleBlur}
            aria-label={`Edit title for ${task.title}`}
          />
          <SyncStatusBadge state={task.syncState} />
        </div>

        <div className={styles.taskMeta}>
          <span className={styles.priorityBadge}>{task.priority}</span>
          <span className={styles.versionBadge}>v{task.version}</span>
        </div>
      </div>

      <div className={styles.taskBottom}>
        <div className={styles.statusGroup}>
          <button
            type="button"
            className={`${styles.statusButton} ${
              task.status === 'todo' ? styles.statusActive : ''
            }`}
            onClick={() => handleStatusChange('todo')}
          >
            Todo
          </button>
          <button
            type="button"
            className={`${styles.statusButton} ${
              task.status === 'in-progress' ? styles.statusActive : ''
            }`}
            onClick={() => handleStatusChange('in-progress')}
          >
            In Progress
          </button>
          <button
            type="button"
            className={`${styles.statusButton} ${
              task.status === 'done' ? styles.statusActive : ''
            }`}
            onClick={() => handleStatusChange('done')}
          >
            Done
          </button>
        </div>

        <div className={styles.taskHints}>
          {editor ? <span>{editor.name} is editing</span> : <span>No active editor</span>}
          {isSaving ? <span>Saving changes…</span> : <span>Inline editable</span>}
        </div>
      </div>
    </article>
  );
}

const TaskRow = React.memo(TaskRowComponent);

export default TaskRow;