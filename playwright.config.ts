import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './src/tests/',
  fullyParallel: false,
  // forbidOnly: !!process.env.CI,
  // retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    // baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    headless: false,
    screenshot: 'on',
    ignoreHTTPSErrors: true,
    actionTimeout: 20000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
