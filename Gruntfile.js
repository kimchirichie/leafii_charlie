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
				files: {
					'public/stylesheets/admin.css' : 'public/stylesheets/scss/admin.scss',
					'public/stylesheets/animate.css' : 'public/stylesheets/scss/animate.scss',
					'public/stylesheets/auth.css' : 'public/stylesheets/scss/auth.scss',
					'public/stylesheets/landing.css' : 'public/stylesheets/scss/landing.scss',
					'public/stylesheets/profile.css' : 'public/stylesheets/scss/profile.scss'
				}
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