import { WorkspaceUiProvider, useWorkspaceUi } from '../state/workspaceContext';
import { useWorkspaceController } from '../hooks/useWorkspaceController';
import WorkspaceHeader from '../components/WorkspaceHeader';
import CollaboratorList from '../components/CollaboratorList';
import TaskComposer from '../components/TaskComposer';
import TaskBoard from '../components/TaskBoard';
import EventTimeline from '../components/EventTimeline';
import ConflictBanner from '../components/ConflictBanner';
import styles from '../styles/workspace.module.css';

function CollaborativeWorkspaceScreen() {
  const { state, dispatch } = useWorkspaceUi();
  const {
    workspaceQuery,
    presenceUsers,
    derived,
    handleCreateTask,
    handleUpdateTask,
    isCreating,
    isUpdating,
  } = useWorkspaceController();

  if (workspaceQuery.isLoading) {
    return <div className={styles.pageState}>Loading collaborative workspace…</div>;
  }

  if (workspaceQuery.isError || !workspaceQuery.data) {
    return <div className={styles.pageState}>Failed to load collaborative workspace.</div>;
  }

  return (
    <div className={styles.page}>
      <ConflictBanner
        message={state.conflictMessage}
        onDismiss={() => dispatch({ type: 'conflict/clear' })}
      />

      <WorkspaceHeader
        title="Collaborative Workspace"
        todoCount={derived.todoCount}
        inProgressCount={derived.inProgressCount}
        doneCount={derived.doneCount}
        isFetching={workspaceQuery.isFetching}
        isOfflineMode={state.isOfflineMode}
        queueCount={state.queue.length}
        onToggleOffline={() =>
          dispatch({ type: 'network/toggle-offline', payload: !state.isOfflineMode })
        }
      />

      <section className={styles.topGrid}>
        <CollaboratorList collaborators={presenceUsers} />
        <TaskComposer onCreateTask={handleCreateTask} isSubmitting={isCreating} />
      </section>

      <section className={styles.contentGrid}>
        <TaskBoard
          tasks={workspaceQuery.data.tasks}
          collaborators={presenceUsers}
          selectedTaskId={state.selectedTaskId}
          isSaving={isUpdating}
          onSelectTask={(taskId) => dispatch({ type: 'task/select', payload: taskId })}
          onUpdateTask={handleUpdateTask}
        />

        <EventTimeline
          events={derived.recentEvents}
          highlightedEventId={state.highlightedEventId}
          onHighlight={(eventId) =>
            dispatch({ type: 'timeline/highlight', payload: eventId })
          }
        />
      </section>
    </div>
  );
}

export default function CollaborativeWorkspacePage() {
  return (
    <WorkspaceUiProvider>
      <CollaborativeWorkspaceScreen />
    </WorkspaceUiProvider>
  );
}