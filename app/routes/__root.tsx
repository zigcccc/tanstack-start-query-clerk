import { QueryDevtools } from '@/components/QueryDevTools'
import { RouterDevtools } from '@/components/RouterDevTools'
import { ClerkProvider, useAuth } from '@clerk/tanstack-start'
import { getAuth } from '@clerk/tanstack-start/server'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Body, createServerFn, Head, Html, json, Meta, Scripts } from '@tanstack/start'
import { Suspense, type PropsWithChildren } from 'react'

const fetchClerkAuth = createServerFn('GET', async (_, ctx) => {
  const user = await getAuth(ctx.request)
  return json(user)
})

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  meta: () => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      title: 'TanStack Start + Clerk',
    },
  ],
  beforeLoad: async ({ context }) => {
    const auth = await fetchClerkAuth();
    return {
      // ...context,
      auth,
    };
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <ClerkProvider>
      <RootDocument>
        <Outlet />
        <Suspense fallback={null}>
          <QueryDevtools initialIsOpen={false} />
          <RouterDevtools />
        </Suspense>
      </RootDocument>
    </ClerkProvider>
  )
}

function RootDocument({ children }: PropsWithChildren) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  )
}