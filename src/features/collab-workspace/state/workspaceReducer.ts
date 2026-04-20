export interface QueuedMutation {
  id: string;
  type: 'task.update';
  payload: {
    taskId: string;
    patch: {
      title?: string;
      status?: 'todo' | 'in-progress' | 'done';
      priority?: 'low' | 'medium' | 'high';
    };
    expectedVersion: number;
  };
}

export interface WorkspaceUiState {
  selectedTaskId: string | null;
  highlightedEventId: string | null;
  conflictMessage: string | null;
  isOfflineMode: boolean;
  queue: QueuedMutation[];
}

export type WorkspaceUiAction =
  | { type: 'task/select'; payload: string | null }
  | { type: 'timeline/highlight'; payload: string | null }
  | { type: 'conflict/show'; payload: string }
  | { type: 'conflict/clear' }
  | { type: 'network/toggle-offline'; payload: boolean }
  | { type: 'queue/enqueue'; payload: QueuedMutation }
  | { type: 'queue/dequeue'; payload: string }
  | { type: 'queue/clear' };

export const initialWorkspaceUiState: WorkspaceUiState = {
  selectedTaskId: null,
  highlightedEventId: null,
  conflictMessage: null,
  isOfflineMode: false,
  queue: [],
};

export function workspaceReducer(
  state: WorkspaceUiState,
  action: WorkspaceUiAction
): WorkspaceUiState {
  switch (action.type) {
    case 'task/select':
      return { ...state, selectedTaskId: action.payload };

    case 'timeline/highlight':
      return { ...state, highlightedEventId: action.payload };

    case 'conflict/show':
      return { ...state, conflictMessage: action.payload };

    case 'conflict/clear':
      return { ...state, conflictMessage: null };

    case 'network/toggle-offline':
      return { ...state, isOfflineMode: action.payload };

    case 'queue/enqueue':
      return { ...state, queue: [...state.queue, action.payload] };

    case 'queue/dequeue':
      return {
        ...state,
        queue: state.queue.filter((item) => item.id !== action.payload),
      };

    case 'queue/clear':
      return { ...state, queue: [] };

    default:
      return state;
  }
}