import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const fromRoot = (path: string) =>
  fileURLToPath(new URL(`../../${path}`, import.meta.url));

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  resolve: {
    alias: {
      '@gitroom/frontend': fromRoot('apps/frontend/src'),
      '@gitroom/react': fromRoot('libraries/react-shared-libraries/src'),
      '@gitroom/nestjs-libraries': fromRoot('libraries/nestjs-libraries/src'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['apps/frontend/tests/**/*.test.tsx'],
  },
});
