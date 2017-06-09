module.exports = function(grunt) {

  // Automatically load our grunt tasks
  require('load-grunt-tasks')(grunt);

  // Grunt task loader options
  var options = {
    config: {
      src: './automation/*.js'
    },
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      pug: "./src/views",
      html: "./build",
      sass: "./src/styles",
      css: "./build/css",
			ts: "./src/app",
    }
  };

  var configs = require('load-grunt-configs')(grunt, options);
  grunt.initConfig(configs);

  // Styles 
  grunt.registerTask('styles', ['sasslint', 'sass', 'cssmin']);

  // Views
  grunt.registerTask('templates', ['pug:dev']);
  grunt.registerTask('buildTemplates', ['pug:build']);

	// Scripts
	grunt.registerTask('scripts', ['webpack-dev-server']);

  // Builds
  grunt.registerTask('default', ['styles', 'templates', 'concurrent']);
  grunt.registerTask('build', ['clean', 'styles', 'buildTemplates', 'webpack']);

	// Git Hooks
	grunt.registerTask('precommit', ['sasslint', 'tslint']);
}
