export type EntityId = string;
export type UserId = string;
export type ISODateString = string;

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type SyncState = 'idle' | 'syncing' | 'saved' | 'error' | 'offline';

export interface Collaborator {
  id: UserId;
  name: string;
  color: string;
  isYou?: boolean;
  isOnline: boolean;
  lastActiveAt: ISODateString;
  editingTaskId?: EntityId | null;
}

export interface WorkspaceTask {
  id: EntityId;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  updatedAt: ISODateString;
  updatedBy: UserId;
  version: number;
  isOptimistic?: boolean;
  syncState?: SyncState;
}

export type WorkspaceEventType =
  | 'task.created'
  | 'task.updated'
  | 'task.deleted'
  | 'presence.updated'
  | 'sync.failed'
  | 'sync.retried'
  | 'conflict.detected';

export interface WorkspaceEvent {
  id: string;
  type: WorkspaceEventType;
  actorId: UserId;
  taskId?: EntityId;
  createdAt: ISODateString;
  message: string;
  meta?: Record<string, unknown>;
}

export interface WorkspaceSnapshot {
  workspaceId: string;
  currentUserId: UserId;
  collaborators: Collaborator[];
  tasks: WorkspaceTask[];
  events: WorkspaceEvent[];
  lastSyncedAt: ISODateString | null;
}

export interface CreateTaskInput {
  title: string;
  priority: TaskPriority;
}

export interface UpdateTaskInput {
  taskId: EntityId;
  patch: Partial<Pick<WorkspaceTask, 'title' | 'status' | 'priority'>>;
  expectedVersion: number;
}

export interface MutationContext {
  previousSnapshot?: WorkspaceSnapshot;
  rollbackTaskId?: EntityId;
}

export interface ApiError extends Error {
  code?: 'VERSION_CONFLICT' | 'NETWORK_ERROR' | 'UNKNOWN';
}