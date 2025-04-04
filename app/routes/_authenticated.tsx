import { SignIn } from '@clerk/tanstack-react-start';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Authenticated } from 'convex/react';

import { UnauthenticatedError } from '@/utils/errors';

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedRoute,
  beforeLoad: async ({ context, search }) => {
    if (!context.userId) {
      throw new UnauthenticatedError('Not authenticated');
    }
    return { search };
  },
  errorComponent: AuthenticatedErrorComponent,
});

function AuthenticatedErrorComponent({ error }: { error: Error }) {
  if (error.name === UnauthenticatedError.name) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <SignIn routing="hash" />
      </div>
    );
  }

  throw error;
}

function AuthenticatedRoute() {
  return (
    <Authenticated>
      <Outlet />
    </Authenticated>
  );
}
