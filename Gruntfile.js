module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			// files: ['*'],
			// tasks: ['nodemon', 'sass:dev'],

			css: {
				files: ['public/stylesheets/scss/*.scss'],
				tasks: ['sass:dev'],
			},

			options: {
				spawn: false,
			},
		},

		sass: {
			dev: {
				options: {
					sourcemap: false,
					style: 'expanded'
				},
				files: {
					'public/stylesheets/css/admin.css' : 'public/stylesheets/scss/admin.scss',
					'public/stylesheets/css/auth.css' : 'public/stylesheets/scss/auth.scss',
					'public/stylesheets/css/thankyou.css' : 'public/stylesheets/scss/thankyou.scss',
					'public/stylesheets/css/landing.css' : 'public/stylesheets/scss/landing.scss',
					'public/stylesheets/css/profile.css' : 'public/stylesheets/scss/profile.scss',
					'public/stylesheets/css/animate.css' : 'public/stylesheets/scss/animate.scss'
				}
			},

			build: {
				options: {
					sourcemap: false,
					style: 'compressed'
				},
				files: {
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
	grunt.loadNpmTasks('grunt-sass');
	
	// Default task(s).
	grunt.registerTask('default', ['sass:dev','nodemon','watch']);
	grunt.registerTask('build', ['nodemon', 'watch','sass:build']);
};