import { getAuth } from '@clerk/tanstack-react-start/server';
import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from 'vinxi/http';

const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());
  return { userId };
});

export const authService = {
  getAuthUser: fetchClerkAuth,
} as const;
