import { useQuery } from '@tanstack/react-query';
import { workspaceApi } from '../api/workspaceApi';

export const workspaceQueryKey = ['collab-workspace'];

export function useWorkspaceQuery() {
  return useQuery({
    queryKey: workspaceQueryKey,
    queryFn: workspaceApi.getWorkspace,
    staleTime: 10_000,
  });
}