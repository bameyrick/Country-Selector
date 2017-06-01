module.exports = {
	options: {
		configFile: './.sass-lint.yml',
	},
	target: [
		'<%= paths.sass %>/**/*.scss',
	],
};
