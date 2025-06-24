import { convexQuery, useConvexMutation } from '@convex-dev/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import { type Id } from 'convex/_generated/dataModel';
import { type CreateComment, createCommentModel } from 'convex/comments/models';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Actionbar } from '@/components/blocks';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/utils/styles';

export const Route = createFileRoute('/_authenticated/todos/$todoId')({
  loader: async ({ params, context }) => {
    await context.queryClient.prefetchQuery(convexQuery(api.todos.queries.read, { id: params.todoId }));
    await context.queryClient.prefetchQuery(
      convexQuery(api.todos.queries.listTodoComments, { id: params.todoId as Id<'todos'> })
    );
  },
  component: TodoDetails,
  pendingComponent: () => <p>Loading from route config...</p>,
});

function TodoDetails() {
  const navigate = Route.useNavigate();
  const { todoId } = Route.useParams();
  const [alertOpen, setAlertOpen] = useState(false);
  const todoQuery = useSuspenseQuery(convexQuery(api.todos.queries.read, { id: todoId }));
  const todoCommentsQuery = useSuspenseQuery(
    convexQuery(api.todos.queries.listTodoComments, { id: todoId as Id<'todos'> })
  );
  const toggleTodo = useMutation({
    mutationFn: useConvexMutation(api.todos.queries.toggleCompleted),
  });
  const deleteTodo = useMutation({
    mutationFn: useConvexMutation(api.todos.queries.remove),
    onSuccess: () => {
      toast.success('Todo deleted!', { richColors: false });
      navigate({ to: '/' });
    },
  });
  const postComment = useMutation({
    mutationFn: useConvexMutation(api.comments.queries.create),
  });

  const sidebar = useSidebar();
  const commentForm = useForm<CreateComment>({
    resolver: zodResolver(createCommentModel),
    defaultValues: { comment: '', todoId },
  });
  const { isValid: isCommentFormValid } = commentForm.formState;

  const handleToggleTodo = () => {
    toggleTodo.mutate({ id: todoQuery.data._id });
  };

  const handleDeleteTodo = () => {
    deleteTodo.mutate({ id: todoQuery.data._id });
  };

  const handleCommentSubmit = (commentFormValues: CreateComment) => {
    postComment.mutate(
      { data: commentFormValues },
      {
        onSuccess: () => {
          toast.success('Comment posted!');
          commentForm.reset();
          commentForm.setFocus('comment');
        },
      }
    );
  };

  if (todoQuery.isLoading) {
    return <p>Loading from component...</p>;
  }

  if (todoQuery.isError) {
    return <p>Oops, error...</p>;
  }

  return (
    <>
      <Actionbar.Content className="flex flex-1 items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="first-letter:capitalize">
                <Link to="/">Todos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="first-letter:capitalize">Todo: {todoQuery.data.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ButtonGroup>
          <Button
            className="hover:text-destructive"
            disabled={deleteTodo.isPending}
            onClick={() => setAlertOpen(true)}
            variant="outline"
          >
            {deleteTodo.isPending && <Loader2Icon className="animate-spin" />}
            Delete
          </Button>
          <Button disabled={deleteTodo.isPending} onClick={() => setAlertOpen(true)} variant="outline">
            {deleteTodo.isPending && <Loader2Icon className="animate-spin" />}
            Edit
          </Button>
          <Button disabled={toggleTodo.isPending} onClick={handleToggleTodo}>
            {toggleTodo.isPending && <Loader2Icon className="animate-spin" />}
            {todoQuery.data.completed ? 'Mark as active' : 'Mark as completed'}
          </Button>
        </ButtonGroup>
        <AlertDialog onOpenChange={setAlertOpen} open={alertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this todo?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will permanently delete this todo from your records.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteTodo}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Actionbar.Content>
      <div className="mx-auto max-w-2xl py-6">
        <h1 className="truncate text-xl font-bold">{todoQuery.data.title}</h1>
        <p>{todoQuery.data.description}</p>
        <h2>Comments:</h2>
        <div className="flex flex-col gap-1">
          {todoCommentsQuery.data.length ? (
            todoCommentsQuery.data.map((comment) => <p key={comment?._id}>{comment.comment}</p>)
          ) : (
            <p>Nothing to see here...</p>
          )}
        </div>
        <Link to="/">Back to home</Link>
      </div>
      <div
        className={cn('fixed right-5 bottom-6 rounded-lg border border-slate-100 p-4 shadow-2xl transition-all', {
          'left-[calc(var(--sidebar-width)+12px)]': sidebar.state === 'expanded',
          'left-[calc(var(--sidebar-width-icon)+36px)]': sidebar.state === 'collapsed',
        })}
      >
        <form
          aria-disabled={!isCommentFormValid}
          className="mb-0 flex w-full items-center gap-2"
          onSubmit={commentForm.handleSubmit(handleCommentSubmit)}
        >
          <Input
            {...commentForm.register('comment')}
            autoFocus
            className="flex-1"
            placeholder="Comment..."
            type="text"
          />
          <Input {...commentForm.register('todoId')} type="hidden" value={todoId} />
          <Button disabled={!isCommentFormValid} type="submit">
            Send
          </Button>
        </form>
      </div>
    </>
  );
}
