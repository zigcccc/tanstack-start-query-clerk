import path from 'path';
import { fileURLToPath } from 'url';

import { clerk, clerkSetup } from '@clerk/testing/playwright';
import { test as setup } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authFile = path.join(__dirname, './.clerk/user.json');

setup('global setup', async () => {
  await clerkSetup({ publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY });

  if (!process.env.E2E_CLERK_USER_USERNAME || !process.env.E2E_CLERK_USER_PASSWORD) {
    throw new Error('Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables.');
  }
});

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  await clerk.signIn({
    page,
    signInParams: {
      strategy: 'password',
      identifier: process.env.E2E_CLERK_USER_USERNAME!,
      password: process.env.E2E_CLERK_USER_PASSWORD!,
    },
  });
  // await page.reload(); .goto('/');
  // await page.waitForSelector('p');

  await page.context().storageState({ path: authFile });
});
