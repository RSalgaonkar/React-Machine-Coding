import React, { createContext, useContext, useMemo, useReducer } from 'react';
import {
  initialWorkspaceUiState,
  workspaceReducer,
  type WorkspaceUiAction,
  type WorkspaceUiState,
} from './workspaceReducer';

interface WorkspaceUiContextValue {
  state: WorkspaceUiState;
  dispatch: React.Dispatch<WorkspaceUiAction>;
}

const WorkspaceUiContext = createContext<WorkspaceUiContextValue | null>(null);

export function WorkspaceUiProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(workspaceReducer, initialWorkspaceUiState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <WorkspaceUiContext.Provider value={value}>
      {children}
    </WorkspaceUiContext.Provider>
  );
}

export function useWorkspaceUi() {
  const context = useContext(WorkspaceUiContext);

  if (!context) {
    throw new Error('useWorkspaceUi must be used within WorkspaceUiProvider');
  }

  return context;
}