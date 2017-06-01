module.exports = {
	dist: {
		files: [
			{
				expand: true,
				cwd: '<%= paths.css %>',
				src: ['**/*.css'],
				dest: '<%= paths.css %>',
				ext: '.css',
			},
		],
		options: {
			keepSpecialComments: 0,
		},
	},
};
