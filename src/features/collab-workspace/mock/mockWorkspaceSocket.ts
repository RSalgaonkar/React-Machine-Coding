import type { Collaborator } from '../types/workspace.types';

type PresenceListener = (users: Collaborator[]) => void;

class MockWorkspaceSocket {
  private listeners = new Set<PresenceListener>();
  private timer: number | null = null;

  constructor(private collaborators: Collaborator[]) {}

  subscribe(listener: PresenceListener) {
    this.listeners.add(listener);
    listener(this.collaborators);

    if (!this.timer) {
      this.timer = window.setInterval(() => {
        this.collaborators = this.collaborators.map((user) => {
          if (user.isYou) {
            return user;
          }

          const isOnline = Math.random() > 0.2;
          const editingTaskId =
            isOnline && Math.random() > 0.5
              ? ['task-1', 'task-2', 'task-3'][Math.floor(Math.random() * 3)]
              : null;

          return {
            ...user,
            isOnline,
            editingTaskId,
            lastActiveAt: new Date().toISOString(),
          };
        });

        this.listeners.forEach((cb) => cb(this.collaborators));
      }, 3500);
    }

    return () => {
      this.listeners.delete(listener);

      if (this.listeners.size === 0 && this.timer) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    };
  }
}

export function createMockWorkspaceSocket(collaborators: Collaborator[]) {
  return new MockWorkspaceSocket(collaborators);
}