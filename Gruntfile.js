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

		sass: {
			dist: {
				files: [{
					sourcemap: false,
					expand: true,
					cwd:'stylesheets',
					src: ['*.scss'],
					dest: '../public/stylesheets',
					ext: '.css'
					// 'public/stylesheets/admin.css' : 'public/stylesheets/scss/admin.scss',
				}]
			}
		},

		nodemon: {
			dev: {
				script: './bin/www'
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-nodemon');

	// Default task(s).
	grunt.registerTask('default', ['nodemon','watch','sass']);
};