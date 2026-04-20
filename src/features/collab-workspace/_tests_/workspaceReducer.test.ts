import {
  initialWorkspaceUiState,
  workspaceReducer,
} from '../state/workspaceReducer';

describe('workspaceReducer', () => {
  it('should toggle offline mode', () => {
    const state = workspaceReducer(initialWorkspaceUiState, {
      type: 'network/toggle-offline',
      payload: true,
    });

    expect(state.isOfflineMode).toBe(true);
  });

  it('should enqueue a queued mutation', () => {
    const state = workspaceReducer(initialWorkspaceUiState, {
      type: 'queue/enqueue',
      payload: {
        id: 'q-1',
        type: 'task.update',
        payload: {
          taskId: 'task-1',
          patch: { status: 'done' },
          expectedVersion: 2,
        },
      },
    });

    expect(state.queue).toHaveLength(1);
    expect(state.queue[0].payload.taskId).toBe('task-1');
  });

  it('should clear conflict message', () => {
    const withConflict = workspaceReducer(initialWorkspaceUiState, {
      type: 'conflict/show',
      payload: 'Conflict detected',
    });

    const cleared = workspaceReducer(withConflict, {
      type: 'conflict/clear',
    });

    expect(cleared.conflictMessage).toBeNull();
  });
});