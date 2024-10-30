import { QueryDevtools } from '@/components/QueryDevTools'
import { RouterDevtools } from '@/components/RouterDevTools'
import { ClerkProvider, useAuth } from '@clerk/tanstack-start'
import { getAuth } from '@clerk/tanstack-start/server'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Body, createServerFn, Head, Html, json, Meta, Scripts } from '@tanstack/start'
import { Suspense, type PropsWithChildren } from 'react'

import appCss from '../main.css?url';

const fetchClerkAuth = createServerFn('GET', async (_, ctx) => {
  try {
    const user = await getAuth(ctx.request)
    return json(user)
  } catch {
    return {} as ReturnType<Awaited<typeof getAuth>>;
  }
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
  links: () => [
    { rel: 'stylesheet', href: appCss }
  ],
  beforeLoad: async () => {
    const auth = await fetchClerkAuth();

    return {
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