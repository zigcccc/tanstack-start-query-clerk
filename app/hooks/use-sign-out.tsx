import { useClerk } from '@clerk/clerk-react';
import { useRouteContext } from '@tanstack/react-router';
import { useCallback } from 'react';

export function useSignOut() {
  const clerk = useClerk();
  const { convexQueryClient, queryClient } = useRouteContext({ from: '__root__' });

  return useCallback(async () => {
    await clerk.signOut();
    convexQueryClient.convexClient.clearAuth();
    queryClient.clear();
  }, [clerk, convexQueryClient.convexClient, queryClient]);
}
