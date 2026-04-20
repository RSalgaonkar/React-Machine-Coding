import { useCallback, useEffect, useMemo } from 'react';
import { useTaskMutations } from './useTaskMutations';
import { useWorkspaceQuery } from './useWorkspaceQuery';
import { usePresenceChannel } from './usePresenceChannel';
import { useWorkspaceUi } from '../state/workspaceContext';
import type { CreateTaskInput, UpdateTaskInput } from '../types/workspace.types';

export function useWorkspaceController() {
  const workspaceQuery = useWorkspaceQuery();
  const { state, dispatch } = useWorkspaceUi();

  const { createTask, updateTask } = useTaskMutations((message) => {
    dispatch({ type: 'conflict/show', payload: message });
  });

  const presenceUsers = usePresenceChannel(workspaceQuery.data?.collaborators ?? []);

  const derived = useMemo(() => {
    const tasks = workspaceQuery.data?.tasks ?? [];
    const events = workspaceQuery.data?.events ?? [];

    return {
      todoCount: tasks.filter((task) => task.status === 'todo').length,
      inProgressCount: tasks.filter((task) => task.status === 'in-progress').length,
      doneCount: tasks.filter((task) => task.status === 'done').length,
      recentEvents: events.slice(0, 12),
    };
  }, [workspaceQuery.data]);

  const handleCreateTask = useCallback(
    (input: CreateTaskInput) => {
      createTask.mutate(input);
    },
    [createTask]
  );

  const handleUpdateTask = useCallback(
    (input: UpdateTaskInput) => {
      if (state.isOfflineMode) {
        dispatch({
          type: 'queue/enqueue',
          payload: {
            id: crypto.randomUUID(),
            type: 'task.update',
            payload: input,
          },
        });
        return;
      }

      updateTask.mutate(input);
    },
    [dispatch, state.isOfflineMode, updateTask]
  );

  useEffect(() => {
    if (state.isOfflineMode) return;
    if (state.queue.length === 0) return;

    const [next] = state.queue;
    updateTask.mutate(next.payload, {
      onSettled: () => {
        dispatch({ type: 'queue/dequeue', payload: next.id });
      },
    });
  }, [dispatch, state.isOfflineMode, state.queue, updateTask]);

  return {
    state,
    dispatch,
    workspaceQuery,
    presenceUsers,
    derived,
    handleCreateTask,
    handleUpdateTask,
    isCreating: createTask.isPending,
    isUpdating: updateTask.isPending,
  };
}