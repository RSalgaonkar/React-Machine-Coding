import type {
  Collaborator,
  UpdateTaskInput,
  WorkspaceTask,
} from '../types/workspace.types';
import TaskRow from './TaskRow';
import styles from '../styles/workspace.module.css';

interface Props {
  tasks: WorkspaceTask[];
  collaborators: Collaborator[];
  selectedTaskId: string | null;
  isSaving: boolean;
  onSelectTask: (taskId: string) => void;
  onUpdateTask: (input: UpdateTaskInput) => void;
}

export default function TaskBoard({
  tasks,
  collaborators,
  selectedTaskId,
  isSaving,
  onSelectTask,
  onUpdateTask,
}: Props) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h3>Collaborative task board</h3>
        <span className={styles.panelMeta}>{tasks.length} tasks</span>
      </div>

      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            collaborators={collaborators}
            isSaving={isSaving}
            isSelected={selectedTaskId === task.id}
            onSelect={onSelectTask}
            onSave={onUpdateTask}
          />
        ))}
      </div>
    </section>
  );
}