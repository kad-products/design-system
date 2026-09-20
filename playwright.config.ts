import { defineConfig, devices } from '@playwright/test';

const galleryUrl = 'http://localhost:5173/playwright/gallery/index.html';

export default defineConfig({
	testDir: './src',
	testMatch: '**/__tests__/*.ct.test.{ts,tsx}',
	timeout: 10 * 1000,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		trace: 'on-first-retry',
		screenshot: 'on',
		baseURL: galleryUrl,
		serviceWorkers: 'block',
		reuseContext: true,
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
	webServer: {
		command: 'npx vite',
		url: galleryUrl,
		reuseExistingServer: !process.env.CI,
	},
});
