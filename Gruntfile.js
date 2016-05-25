module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			files: ['*'],
			tasks: ['nodemon'],
			options: {
				spawn: false,
			},
		},
		nodemon: {
			dev: {
				script: './bin/www'
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');

	// Default task(s).
	grunt.registerTask('default', ['nodemon','watch']);
};