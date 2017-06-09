module.exports = {
	pug: {
		cwd: "<%= paths.pug %>",
		files: [
			'**/*.pug',
			'**/*_.pug',
		],
		tasks: [
			'templates',
		],
		options: {
			spawn: true,
			interrupt: true,
			livereload: true,
		},
	},

	styles: {
		cwd: "<%= paths.sass %>",
		files: [
			'**/*.scss',
		],
		tasks: [
			'styles',
			'templates',
		],
		options: {
			spawn: true,
			interrupt: true,
			livereload: true,
		},
	},
};
