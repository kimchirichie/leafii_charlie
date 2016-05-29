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
					// sourcemap: false,
					// expand: true,
					// cwd:'stylesheets/css',
					// src: ['*.scss'],
					// dest: '../public/stylesheets/css',
					// ext: '.css'
					'public/stylesheets/css/admin.css' : 'public/stylesheets/scss/admin.scss',
					'public/stylesheets/css/auth.css' : 'public/stylesheets/scss/auth.scss',
					'public/stylesheets/css/thankyou.css' : 'public/stylesheets/scss/thankyou.scss',
					'public/stylesheets/css/landing.css' : 'public/stylesheets/scss/landing.scss',
					'public/stylesheets/css/profile.css' : 'public/stylesheets/scss/profile.scss',
					'public/stylesheets/css/animate.css' : 'public/stylesheets/scss/animate.scss'
				}
			}
		},

		nodemon: {
				dev: {
					script: './bin/www'
				},
		},
	});

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	
	// Default task(s).
	grunt.registerTask('default', ['nodemon','watch','sass']);
};