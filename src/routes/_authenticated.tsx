import { SignIn } from '@clerk/tanstack-react-start';
import { createFileRoute } from '@tanstack/react-router';

import { UnauthenticatedError } from '@/utils/errors';

export const Route = createFileRoute('/_authenticated')({
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
        <SignIn forceRedirectUrl={typeof window !== 'undefined' ? window.location.href : undefined} routing="hash" />
      </div>
    );
  }

  throw error;
}
