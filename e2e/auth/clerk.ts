import path from 'path';
import { fileURLToPath } from 'url';

import { setupClerkTestingToken, clerk } from '@clerk/testing/playwright';
import { type Page } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authFile = path.join(__dirname, './.clerk/user.json');

export async function setupAuthUser(page: Page) {
  await setupClerkTestingToken({ page });
  await page.goto('/');
  await clerk.signIn({
    page,
    signInParams: {
      strategy: 'password',
      identifier: process.env.E2E_CLERK_USER_USERNAME!,
      password: process.env.E2E_CLERK_USER_PASSWORD!,
    },
  });

  await page.context().storageState({ path: authFile });
}
