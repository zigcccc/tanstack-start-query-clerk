import { SignIn } from '@clerk/tanstack-start'
import { getAuth } from '@clerk/tanstack-start/server'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'

import { ApiRequestError, UnauthenticatedError } from '@/utils/errors'

const fetchSingleTodo = createServerFn('GET', async (todoId: string, ctx) => {
  const auth = await getAuth(ctx.request);
  const token = await auth.getToken();

  if (!token) {
    throw new UnauthenticatedError('Not Authenticated');
  }

  const response = await fetch(process.env.VITE_API_URL + `/todos/${todoId}/`, {
    headers: new Headers({ Authorization: `Bearer ${token}` }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw notFound()
    }

    throw new ApiRequestError(response);
  }

  return response.json();
})

const todoDetailsQueryOptions = (todoId: string) => queryOptions({
  queryKey: ['todos', todoId],
  queryFn: async () => fetchSingleTodo(todoId),
})

export const Route = createFileRoute('/todos/$todoId')({
  beforeLoad: ({ context }) => {
    if (!context.auth.userId) {
      throw new UnauthenticatedError('Not authenticated');
    }
  },
  errorComponent: ({ error }) => {
    if (error.name === UnauthenticatedError.name) {
      return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SignIn routing="hash" />
        </div>
      );
    }

    throw error;
  },
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(todoDetailsQueryOptions(params.todoId))
  },
  component: TodoDetails,
  pendingComponent: () => <p>Loading from route config...</p>
})

function TodoDetails() {
  const { todoId } = Route.useParams();
  const todoQuery = useSuspenseQuery(todoDetailsQueryOptions(todoId));

  if (todoQuery.isLoading) {
    return <p>Loading from component...</p>
  }

  if (todoQuery.isError) {
    return <p>Oops, error...</p>
  }

  return (
    <>
      <h1>{todoQuery.data.title}</h1>
      <p>{todoQuery.data.description}</p>
      <Link to="/">Back to home</Link>
    </>
  )
}