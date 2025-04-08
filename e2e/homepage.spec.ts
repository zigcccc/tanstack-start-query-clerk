import { test, expect } from '@playwright/test';

import { setupAuthUser } from './auth';

test('has title', async ({ page }) => {
  await setupAuthUser(page);

  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/TanStack Start \+ Clerk/);
  await expect(page).toHaveURL(/.*\?filter=all/);
});
