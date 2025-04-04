import { ClerkProvider, useAuth } from '@clerk/tanstack-react-start';
import { type ConvexQueryClient } from '@convex-dev/react-query';
import { type QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet, Scripts, HeadContent } from '@tanstack/react-router';
import { Authenticated } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { Suspense, type PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import { Actionbar, AppSidebar } from '@/components/blocks';
import { QueryDevtools, RouterDevtools } from '@/components/devtools';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { authService } from '@/modules/auth';

import appCss from '../main.css?url';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient; convexQueryClient: ConvexQueryClient }>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start + Clerk + Convex',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  beforeLoad: async () => {
    const { userId } = await authService.getAuthUser();
    return { userId };
  },
  component: RootComponent,
});

function RootComponent() {
  const { convexQueryClient } = Route.useRouteContext();

  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convexQueryClient.convexClient} useAuth={useAuth}>
        <RootDocument>
          <Outlet />
          <Suspense fallback={null}>
            <QueryDevtools initialIsOpen={false} />
            <RouterDevtools />
          </Suspense>
        </RootDocument>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function RootDocument({ children }: PropsWithChildren) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <SidebarProvider>
          <Toaster position="top-center" richColors />
          <AppSidebar />
          <SidebarInset>
            <main className="flex-1">
              <Actionbar.Provider>
                <Authenticated>
                  <Actionbar.Root />
                </Authenticated>
                <div className="px-3">{children}</div>
              </Actionbar.Provider>
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Scripts />
      </body>
    </html>
  );
}
