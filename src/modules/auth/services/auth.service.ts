import { getAuth } from '@clerk/tanstack-react-start/server';
import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';

const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const auth = await getAuth(getWebRequest());

  return { userId: auth.userId };
});

export const authService = {
  getAuthUser: fetchClerkAuth,
} as const;
