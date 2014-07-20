'use strict';

module.exports = function(grunt) {
	require('jit-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

		// jshint: {
		// 	options: {
		// 		jshintrc: '.jshintrc'
		// 	},
		// 	gruntfile: {
		// 		src: 'Gruntfile.js'
		// 	},
		// 	lib: {
		// 		options: {
		// 			jshintrc: '.jshintrc'
		// 		},
		// 		src: [
		// 			'app/js/**/*.js'
		// 			, '!app/js/libs/**/*.js'
		// 		]
		// 	},
		// 	test: {
		// 		src: ['app/test/**/*.js']
		// 	}
		// },

		// watch: {
		// 	gruntfile: {
		// 		files: '<%= jshint.gruntfile.src %>',
		// 		tasks: ['jshint:gruntfile']
		// 	}
		// 	, lib: {
		// 		files: '<%= jshint.lib.src %>',
		// 		tasks: ['jshint:lib', 'nodeunit']
		// 	}
		// 	, test: {
		// 		files: '<%= jshint.test.src %>',
		// 		tasks: ['jshint:test', 'nodeunit']
		// 	}
		// },

		clean: {
			options: {
				force: true
			},
			dist: {
				expand: true,
				cwd: 'dist/',
				src: '**',
				flatten: false
			}
		}

		, requirejs: {
			compile: {
				options: {
					baseUrl: "app/js",
					mainConfigFile: "app/js/main.js",
					name: "main",
					out: "dist/js/main.min.js"
				}
			}
		}

		, copy: {
			dist: {
				files: [
					// {
					// 	src: 'index.html',
					// 	dest: 'dist/index.html'
					// },
					{
						src: 'app/js/libs/bower/requirejs/require.js',
						dest: 'dist/js/require.js'
					},
					{
						expand: true,
						cwd: 'app/js/libs/bower/bootstrap/fonts',
						src: '**',
						dest: 'dist/fonts',
						flatten: false
					}
				]
			}
		}

		, cssmin: {
			combine: {
				files: {
					'dist/css/main.min.css': ['app/css/main.css', 'app/js/libs/bower/bootstrap/dist/css/bootstrap.min.css', 'app/js/libs/bower/bootstrap/dist/css/bootstrap-theme.min.css', 'app/css/jquery-ui/jquery-ui.min.css'],
					// 'dist/css/main.min.css': ['app/css/main.css'],
					options: {
						keepSpecialComments: 0
					}
				}
			}
		}
	});

	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-contrib-requirejs');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-copy');

	// grunt.registerTask('default', ['jshint', 'requirejs']);
	grunt.registerTask('firefoxos', ['clean', 'requirejs', 'copy', 'cssmin']);

};
