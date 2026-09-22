import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:4300',
    locale: 'pt-BR',
    browserName: 'chromium',
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'pnpm --filter postora-marketing start',
    url: 'http://127.0.0.1:4300',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
