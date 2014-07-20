'use strict';

module.exports = function(grunt) {
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-useminPrepare'
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

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

		jshint: {
			lib: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'app/js/**/*.js'
					, '!app/js/libs/**/*.js'
				]
			}
			, test: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'app/test/jasmine/**/*.js'
					, '!app/test/jasmine/lib/**/*.js'
				]
			}
		},

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
					out: "dist/app/js/main.min.js",
					preserveLicenseComments: false
				}
			}
		}

		, copy: {
			dist: {
				files: [
					{
						src: 'app/js/libs/bower/requirejs/require.js',
						dest: 'dist/app/js/require.js'
					},
					{
						expand: true,
						cwd: 'app/js/libs/bower/bootstrap/fonts',
						src: '**',
						dest: 'dist/app/fonts',
						flatten: false
					},
					{
						expand: true,
						cwd: 'app/img',
						src: '**',
						dest: 'dist/app/img',
						flatten: false
					}
				]
			}
		}

		, cssmin: {
			combine: {
				files: {
					'dist/app/css/main.min.css': ['app/css/main.css', 'app/js/libs/bower/bootstrap/dist/css/bootstrap.min.css', 'app/js/libs/bower/bootstrap/dist/css/bootstrap-theme.min.css', 'app/css/jquery-ui/jquery-ui.min.css']
				}
				, options: {
					keepSpecialComments: 0
				}
			}
		}

		, processhtml: {
			options: {
				data: {
					jsBuildScript: '<script data-main="app/js/main.min.js" src="app/js/require.js"></script>'
				}
			},
			dist: {
				files: {
					'dist/index.html': ['index.html']
				}
			}
		}

		, htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'dist/index.html'
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
			deploy_ffxos: {
				cwd: '../ffxos',
				cmd: 'git commit -am "Deploy JAMES version <%= pkg.version %>" && git push github gh-pages'
			}
			
		}
	});

	grunt.registerTask('build', ['clean', 'copy', 'requirejs', 'cssmin', 'processhtml', 'htmlmin']);

	grunt.registerTask('tooling', ['processhtml', 'htmlmin']);

	// FIXME fix compress task
	// grunt.registerTask('ffxos', ['build', 'compress', 'exec:deploy_ffoxos']);
};
