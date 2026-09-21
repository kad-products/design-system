export default {
	tags: ['-lintignore', '-knipTestExport'],
	ignoreExportsUsedInFile: true,
	ignoreFiles: ['release.config.js'],
	entry: ['src/index.ts', 'playwright/gallery/main.tsx'],
	compilers: {
		css: (text: string): string => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
	},
};
