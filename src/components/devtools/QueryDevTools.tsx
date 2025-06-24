import { lazy } from 'react';

export const QueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);
