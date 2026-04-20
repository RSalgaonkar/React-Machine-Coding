import type { WorkspaceSnapshot } from '../types/workspace.types';

const now = new Date().toISOString();

export const mockWorkspaceSeed: WorkspaceSnapshot = {
  workspaceId: 'workspace-1',
  currentUserId: 'u-1',
  lastSyncedAt: now,
  collaborators: [
    {
      id: 'u-1',
      name: 'Rashmith',
      color: '#2563eb',
      isYou: true,
      isOnline: true,
      lastActiveAt: now,
      editingTaskId: null,
    },
    {
      id: 'u-2',
      name: 'Aisha',
      color: '#16a34a',
      isOnline: true,
      lastActiveAt: now,
      editingTaskId: 'task-2',
    },
    {
      id: 'u-3',
      name: 'Kabir',
      color: '#9333ea',
      isOnline: false,
      lastActiveAt: new Date(Date.now() - 1000 * 60 * 9).toISOString(),
      editingTaskId: null,
    },
  ],
  tasks: [
    {
      id: 'task-1',
      title: 'Design reducer event model',
      status: 'in-progress',
      priority: 'high',
      updatedAt: now,
      updatedBy: 'u-1',
      version: 1,
      syncState: 'saved',
    },
    {
      id: 'task-2',
      title: 'Implement optimistic update flow',
      status: 'todo',
      priority: 'high',
      updatedAt: now,
      updatedBy: 'u-2',
      version: 2,
      syncState: 'saved',
    },
    {
      id: 'task-3',
      title: 'Build event timeline replay panel',
      status: 'done',
      priority: 'medium',
      updatedAt: now,
      updatedBy: 'u-3',
      version: 3,
      syncState: 'saved',
    },
  ],
  events: [
    {
      id: 'evt-1',
      type: 'task.updated',
      actorId: 'u-2',
      taskId: 'task-2',
      createdAt: now,
      message: 'Aisha updated optimistic flow task.',
    },
    {
      id: 'evt-2',
      type: 'presence.updated',
      actorId: 'u-3',
      createdAt: now,
      message: 'Kabir went offline.',
    },
  ],
};