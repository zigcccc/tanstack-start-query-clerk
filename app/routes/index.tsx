import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { queryOptions, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { SignIn, useClerk, useUser } from '@clerk/tanstack-start'
import { getAuth } from '@clerk/tanstack-start/server'

import { UnauthenticatedError } from '@/utils/errors'

const fetchTodos = createServerFn('GET', async (_, ctx) => {
  const auth = await getAuth(ctx.request);
  const token = await auth.getToken();

  if (!token) {
    throw new UnauthenticatedError('Not authenticated');
  }

  const response = await fetch(process.env.VITE_API_URL + '/todos/', { headers: new Headers({ Authorization: `Bearer ${token}` })});

  if (!response.ok) {
    throw new Error(`${response.statusText} (${response.status})`);
  }

  return response.json();
})

const todosQueryOptions = queryOptions({
  queryKey: ['todos', 'list'],
  queryFn: async () => fetchTodos(),
})

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad: async ({ context }) => {
    if (!context.auth.userId) {
      throw new UnauthenticatedError('Not authenticated')
    }
  },
  errorComponent: ({ error }) => {
    if (error.name === UnauthenticatedError.name) {
      return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SignIn routing="hash" />
        </div>
      )
    }
    throw error;
  },
  loader: async ({ context }) => {
    if (context.auth.userId) {
      await context.queryClient.ensureQueryData(todosQueryOptions)
    }
  },
  pendingComponent: () => <p>Loading...</p>
})

function Home() {
  const authUser = useUser();
  const queryClient = useQueryClient();
  const clerk = useClerk();
  const todosQuery = useSuspenseQuery(todosQueryOptions);

  const handleSignOut = async () => {
    await clerk.signOut();
    queryClient.clear();
  }

  return (
    <>
      {authUser.isSignedIn && (
        <>
          <p>
            Hello {authUser.user?.fullName}
          </p>
          {/* <SignOutButton redirectUrl='/' /> */}
          <button onClick={handleSignOut}>Sign out</button>
        </>
      )}
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {todosQuery.data?.data.map((todo: any) => (
          <Link to="/todos/$todoId" params={{ todoId: todo.id }} key={todo.id}>{todo.title}</Link>
        ))}
      </div>
    </>
  )
}