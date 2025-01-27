import { useOrganizationList } from '@clerk/tanstack-start';
import { convexQuery, useConvexMutation } from '@convex-dev/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { api } from 'convex/_generated/api';
import { type Id } from 'convex/_generated/dataModel';
import { type CreateTodo, createTodoModel, type Todo, todoFilter, type TodoFilter } from 'convex/todos/models';
import { TrashIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Actionbar, Tabs } from '@/components/blocks';
import { TextField } from '@/components/inputs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/utils/styles';

const indexSearchParams = z.object({
  filter: fallback(todoFilter, 'all').default('all'),
});

export const Route = createFileRoute('/_authenticated/')({
  component: Home,
  validateSearch: zodValidator(indexSearchParams),
  beforeLoad: ({ search }) => ({ filter: search.filter }),
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(convexQuery(api.todos.queries.list, { filter: context.filter }));
  },
  pendingComponent: () => <p>Loading...</p>,
});

function Home() {
  const { filter } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { queryClient } = Route.useRouteContext();
  const todosQuery = useSuspenseQuery(convexQuery(api.todos.queries.list, { filter }));
  const createTodo = useMutation({
    mutationFn: useConvexMutation(api.todos.queries.create),
  });
  const deleteTodo = useMutation({
    mutationFn: useConvexMutation(api.todos.queries.remove),
  });
  const toggleTodo = useMutation({
    mutationFn: useConvexMutation(api.todos.queries.toggleCompleted),
    onMutate: async ({ id }: { id: Id<'todos'> }) => {
      const { queryKey } = convexQuery(api.todos.queries.list, { filter });
      const allTodos = await queryClient.getQueryData<Todo[]>(queryKey);
      const todoIdx = allTodos?.findIndex(({ _id }) => _id === id);

      if (todoIdx) {
        queryClient.setQueryData<Todo[]>(queryKey, (previousTodos) => {
          const todosCopy = [...previousTodos!];
          todosCopy[todoIdx].completed = true;
          return todosCopy;
        });
      }

      return { previousTodos: allTodos, queryKey };
    },
    onError: (_err, _newTodo, context) => {
      if (context) {
        queryClient.setQueryData(context.queryKey, context.previousTodos);
      }
    },
  });
  const {
    reset,
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<CreateTodo>({
    defaultValues: { title: '' },
    resolver: zodResolver(createTodoModel),
  });

  const handleCreateTodo = (data: CreateTodo) => {
    createTodo.mutate(
      { data },
      {
        onSuccess: () => {
          reset({ title: '' });
          setFocus('title');
        },
      }
    );
  };

  const handleDeleteTodo = (id: Id<'todos'>, title: string) => {
    deleteTodo.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success(`To-do has been deleted!`, {
            position: 'top-center',
            richColors: false,
            action: {
              label: 'Undo?',
              onClick: () => handleCreateTodo({ title }),
            },
          });
          setFocus('title');
        },
      }
    );
  };

  const handleToggleTodo = (id: Id<'todos'>) => {
    toggleTodo.mutate({ id });
  };

  const { userMemberships, setActive } = useOrganizationList({ userMemberships: { infinite: true } });
  const handleSetActiveOrganization = async (orgId?: string) => {
    await setActive?.({ organization: orgId });
  };

  return (
    <div className="container mx-auto">
      <Actionbar.Content className="flex flex-1 items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="first-letter:capitalize">{filter} todos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ButtonGroup>
          <Button onClick={() => handleSetActiveOrganization(userMemberships.data?.at(0)?.organization.id)}>
            Set active organization
          </Button>
        </ButtonGroup>
      </Actionbar.Content>
      <form className="flex items-end gap-1" onSubmit={handleSubmit(handleCreateTodo)}>
        <TextField
          {...register('title')}
          autoFocus
          className="mt-4 flex-1"
          error={errors.title}
          label="What's the plan?"
          placeholder="I want to do..."
          type="text"
        />
      </form>
      <Tabs
        aria-label="Todo filters"
        className="mt-6"
        onSelectionChange={(selectedFilter) => navigate({ search: () => ({ filter: selectedFilter as TodoFilter }) })}
        renderTabPanelContent={() => (
          <div className="flex flex-col gap-3 text-xl">
            {todosQuery.data.map((todo) => (
              <div key={todo._id} className="flex items-center rounded border border-gray-200 px-4 py-3">
                <div className="flex flex-1 items-center gap-2">
                  <Checkbox checked={todo.completed} onCheckedChange={() => handleToggleTodo(todo._id)} />
                  <Link
                    className={cn('text-sm font-medium text-slate-700', { 'line-through': todo.completed })}
                    params={{ todoId: todo._id }}
                    to="/todos/$todoId"
                  >
                    {todo.title}
                  </Link>
                </div>
                <Button
                  className="group"
                  disabled={deleteTodo.isPending && deleteTodo.variables.id === todo._id}
                  onClick={() => handleDeleteTodo(todo._id, todo.title)}
                  size="sm"
                  variant="ghost"
                >
                  <TrashIcon className="text-slate-400 transition group-hover:text-slate-700" />
                </Button>
              </div>
            ))}
          </div>
        )}
        selectedKey={filter}
      >
        <Tabs.Tab key={todoFilter.Enum.all} title="All todos" />
        <Tabs.Tab key={todoFilter.Enum.active} title="Active todos" />
        <Tabs.Tab key={todoFilter.Enum.completed} title="Completed todos" />
      </Tabs>
    </div>
  );
}
