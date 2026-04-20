import { useEffect, useState } from 'react';
import type { Collaborator } from '../types/workspace.types';
import { createMockWorkspaceSocket } from '../mock/mockWorkspaceSocket';

export function usePresenceChannel(seedUsers: Collaborator[]) {
  const [users, setUsers] = useState(seedUsers);

  useEffect(() => {
    if (!seedUsers.length) return;

    const socket = createMockWorkspaceSocket(seedUsers);
    const unsubscribe = socket.subscribe(setUsers);

    return unsubscribe;
  }, [seedUsers]);

  return users;
}