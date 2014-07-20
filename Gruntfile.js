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
			},
			zip: {
				src: '<%= pkg.name %>.zip'
			}
		}

		, requirejs: {
			compile: {
				options: {
					baseUrl: "app/js",
					mainConfigFile: "app/js/main.js",
					name: "main",
					out: "dist/js/main.min.js",
					preserveLicenseComments: false
				}
			}
		}

		, copy: {
			dist: {
				files: [
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
					'dist/css/main.min.css': ['app/css/main.css', 'app/js/libs/bower/bootstrap/dist/css/bootstrap.min.css', 'app/js/libs/bower/bootstrap/dist/css/bootstrap-theme.min.css', 'app/css/jquery-ui/jquery-ui.min.css']
				}
				, options: {
					keepSpecialComments: 0
				}
			}
		}

		, compress : {
			main : {
				options : {
					archive : "../ffoxos/james/<%= pkg.name %>.zip"
				},
				files : [
					{
						expand: true,
						src: "**/*",
						cwd: "dist/"
					}, 
					{
						src: [
							'index.html',
							'manifest.webapp'
						],
						dest: ''
					}
				]
			}
		}

		, exec: {
			deploy_ffoxos: {
				cwd: '../ffoxos',
				cmd: 'git commit -am "Deploy JAMES version <%= pkg.version %>" && git push github gh-pages'
			}
			
		}
	});

	grunt.registerTask('firefoxos', ['clean', 'requirejs', 'copy', 'cssmin', 'compress']);
	grunt.registerTask('deploy', ['firefoxos', 'exec:deploy_ffoxos']);
};
