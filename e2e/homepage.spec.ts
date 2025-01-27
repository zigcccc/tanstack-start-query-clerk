import { setupClerkTestingToken } from '@clerk/testing/playwright';
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await setupClerkTestingToken({ page });

  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/TanStack Start \+ Clerk/);
  await expect(page).toHaveURL(/.*\?filter=all/);
});
