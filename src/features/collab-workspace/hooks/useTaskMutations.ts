import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workspaceApi } from '../api/workspaceApi';
import { workspaceQueryKey } from './useWorkspaceQuery';
import type {
  ApiError,
  CreateTaskInput,
  MutationContext,
  UpdateTaskInput,
  WorkspaceEvent,
  WorkspaceSnapshot,
  WorkspaceTask,
} from '../types/workspace.types';

function buildEvent(message: string, type: WorkspaceEvent['type'], actorId: string, taskId?: string) {
  return {
    id: crypto.randomUUID(),
    type,
    actorId,
    taskId,
    createdAt: new Date().toISOString(),
    message,
  } satisfies WorkspaceEvent;
}

export function useTaskMutations(onConflict?: (message: string) => void) {
  const queryClient = useQueryClient();

  const createTask = useMutation<WorkspaceTask, ApiError, CreateTaskInput, MutationContext>({
    mutationFn: workspaceApi.createTask,
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: workspaceQueryKey });

      const previousSnapshot = queryClient.getQueryData<WorkspaceSnapshot>(workspaceQueryKey);

      if (previousSnapshot) {
        const optimisticTask: WorkspaceTask = {
          id: `optimistic-${crypto.randomUUID()}`,
          title: input.title,
          priority: input.priority,
          status: 'todo',
          updatedAt: new Date().toISOString(),
          updatedBy: previousSnapshot.currentUserId,
          version: 0,
          isOptimistic: true,
          syncState: 'syncing',
        };

        queryClient.setQueryData<WorkspaceSnapshot>(workspaceQueryKey, {
          ...previousSnapshot,
          tasks: [optimisticTask, ...previousSnapshot.tasks],
          events: [
            buildEvent(
              `You created "${input.title}"`,
              'task.created',
              previousSnapshot.currentUserId,
              optimisticTask.id
            ),
            ...previousSnapshot.events,
          ],
        });
      }

      return { previousSnapshot };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousSnapshot) {
        queryClient.setQueryData(workspaceQueryKey, context.previousSnapshot);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: workspaceQueryKey });
    },
  });

  const updateTask = useMutation<WorkspaceTask, ApiError, UpdateTaskInput, MutationContext>({
    mutationFn: workspaceApi.updateTask,
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: workspaceQueryKey });

      const previousSnapshot = queryClient.getQueryData<WorkspaceSnapshot>(workspaceQueryKey);

      if (previousSnapshot) {
        queryClient.setQueryData<WorkspaceSnapshot>(workspaceQueryKey, {
          ...previousSnapshot,
          tasks: previousSnapshot.tasks.map((task) =>
            task.id === input.taskId
              ? {
                  ...task,
                  ...input.patch,
                  isOptimistic: true,
                  syncState: 'syncing',
                }
              : task
          ),
          events: [
            buildEvent(
              `You updated a task`,
              'task.updated',
              previousSnapshot.currentUserId,
              input.taskId
            ),
            ...previousSnapshot.events,
          ],
        });
      }

      return {
        previousSnapshot,
        rollbackTaskId: input.taskId,
      };
    },
    onError: (error, _variables, context) => {
      if (context?.previousSnapshot) {
        queryClient.setQueryData(workspaceQueryKey, context.previousSnapshot);
      }

      if (error.code === 'VERSION_CONFLICT') {
        onConflict?.('Version conflict detected. The latest server state has been restored.');
      } else {
        onConflict?.('Update failed. Changes were rolled back safely.');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: workspaceQueryKey });
    },
  });

  return { createTask, updateTask };
}