import react from '@vitejs/plugin-react';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['html'],
    },
  },
});
