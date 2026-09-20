/// <reference types="vitest/config" />

/// <reference types="vitest/config" />
import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname: string = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	plugins: [
		react(),
		dts({
			include: ['src'],
			exclude: ['src/**/*.stories.tsx', 'src/**/*.spec.tsx', 'src/test/**'],
			// Bundle all component .d.ts files into a single dist/index.d.ts
			rollupTypes: true,
			insertTypesEntry: true,
		}),
	],
	css: {
		modules: {
			// import styles from './Button.module.css' -> styles.rootButton
			localsConvention: 'camelCaseOnly',
			generateScopedName: 'ds-[name]__[local]___[hash:base64:5]',
		},
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es'],
			fileName: 'design-system',
		},
		sourcemap: true,
		// Emit one combined stylesheet (dist/style.css) instead of
		// splitting CSS per component.
		cssCodeSplit: false,
		rollupOptions: {
			// Don't bundle react or Radix into the output — they're resolved
			// from the consuming project's / this package's own node_modules.
			external: ['react', 'react-dom', 'react/jsx-runtime', 'radix-ui'],
		},
	},
	test: {
		exclude: ['**/__tests__/*.ct.test.{ts,tsx}', 'node_modules'],
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(__dirname, '.storybook'),
					}),
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [
							{
								browser: 'chromium',
							},
						],
					},
				},
			},
		],
	},
});
