import type {
  ApiError,
  CreateTaskInput,
  UpdateTaskInput,
  WorkspaceSnapshot,
  WorkspaceTask,
} from '../types/workspace.types';
import { mockWorkspaceSeed } from '../mock/mockWorkspaceSeed';

let db: WorkspaceSnapshot = structuredClone(mockWorkspaceSeed);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldFail = (rate = 0.15) => Math.random() < rate;

function createApiError(message: string, code: ApiError['code']): ApiError {
  const error = new Error(message) as ApiError;
  error.code = code;
  return error;
}

export const workspaceApi = {
  async getWorkspace(): Promise<WorkspaceSnapshot> {
    await sleep(400);
    return structuredClone(db);
  },

  async createTask(input: CreateTaskInput): Promise<WorkspaceTask> {
    await sleep(500);

    if (shouldFail(0.1)) {
      throw createApiError('Failed to create task', 'NETWORK_ERROR');
    }

    const newTask: WorkspaceTask = {
      id: crypto.randomUUID(),
      title: input.title,
      priority: input.priority,
      status: 'todo',
      updatedAt: new Date().toISOString(),
      updatedBy: db.currentUserId,
      version: 1,
      syncState: 'saved',
    };

    db.tasks = [newTask, ...db.tasks];
    db.events = [
      {
        id: crypto.randomUUID(),
        type: 'task.created',
        actorId: db.currentUserId,
        taskId: newTask.id,
        createdAt: new Date().toISOString(),
        message: `Created task "${newTask.title}"`,
      },
      ...db.events,
    ];
    db.lastSyncedAt = new Date().toISOString();

    return structuredClone(newTask);
  },

  async updateTask(input: UpdateTaskInput): Promise<WorkspaceTask> {
    await sleep(600);

    if (shouldFail(0.15)) {
      throw createApiError('Network error while updating task', 'NETWORK_ERROR');
    }

    const task = db.tasks.find((item) => item.id === input.taskId);

    if (!task) {
      throw createApiError('Task not found', 'UNKNOWN');
    }

    if (task.version !== input.expectedVersion) {
      throw createApiError('Version conflict detected', 'VERSION_CONFLICT');
    }

    const updatedTask: WorkspaceTask = {
      ...task,
      ...input.patch,
      version: task.version + 1,
      updatedAt: new Date().toISOString(),
      updatedBy: db.currentUserId,
      syncState: 'saved',
    };

    db.tasks = db.tasks.map((item) => (item.id === updatedTask.id ? updatedTask : item));
    db.events = [
      {
        id: crypto.randomUUID(),
        type: 'task.updated',
        actorId: db.currentUserId,
        taskId: updatedTask.id,
        createdAt: new Date().toISOString(),
        message: `Updated "${updatedTask.title}"`,
      },
      ...db.events,
    ];
    db.lastSyncedAt = new Date().toISOString();

    return structuredClone(updatedTask);
  },
};