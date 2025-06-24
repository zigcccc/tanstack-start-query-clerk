import { type ErrorComponentProps, useRouter, useMatch, rootRouteId, ErrorComponent } from '@tanstack/react-router';
import { Link } from 'lucide-react';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({ strict: false, select: (state) => state.id === rootRouteId });

  console.error(error);

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4">
      <ErrorComponent error={error} />
      <div className="flex flex-wrap items-center gap-2">
        <button
          className="rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700"
          onClick={() => {
            router.invalidate();
          }}
        >
          Try Again
        </button>
        {isRoot ? (
          <Link className="rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700" to="/">
            Home
          </Link>
        ) : (
          <Link
            className="rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            to="/"
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  );
}
