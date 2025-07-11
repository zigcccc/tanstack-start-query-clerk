import { ConvexQueryClient } from '@convex-dev/react-query';
import { notifyManager, QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter, ErrorComponent } from '@tanstack/react-router';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';

import { NotFound } from './components/NotFound';
import { routeTree } from './routeTree.gen';

export function createRouter() {
  if (typeof document !== 'undefined') {
    notifyManager.setScheduler(window.requestAnimationFrame);
  }

  const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL!;
  if (!CONVEX_URL) {
    console.error('missing envar VITE_CONVEX_URL');
  }
  const convexQueryClient = new ConvexQueryClient(CONVEX_URL);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  });
  convexQueryClient.connect(queryClient);

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient, convexQueryClient },
      defaultPreload: 'intent',
      defaultErrorComponent: ErrorComponent,
      defaultNotFoundComponent: NotFound,
      scrollRestoration: true,
    }),
    queryClient
  );
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
