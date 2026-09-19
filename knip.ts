export default {
	tags: ['-lintignore', '-knipTestExport'],
	ignoreExportsUsedInFile: true,
	ignoreFiles: ['release.config.js'],
	compilers: {
		css: (text: string): string => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
	},
};
