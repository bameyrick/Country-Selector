module.exports = {
	dist: {
		options: {
			style: 'expanded',
		},
		files: [
			{
				expand: true,
				cwd: '<%= paths.sass %>',
				src: ['**/*.scss'],
				dest: '<%= paths.css %>',
				ext: '.css',
			},
		],
	},
};
