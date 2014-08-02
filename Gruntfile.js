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
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
		, livereloadPort : 4000

		, watch: {
			templates: {
				files: ['app/templates/**/*.tpl'],
				tasks: ['handlebars']
			}
			// , reload: {
			// 	files: ['templates.js'],
			// 	options: {
			// 		livereload: '<%= livereloadPort %>',
			// 		interval: 700
			// 	}
			// }
		}

		, jshint: {
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

					// chrome
					{
						src: 'app/js/chrome.js',
						dest: 'dist/app/js/chrome.js'
					},
					{
						src: 'manifest.json',
						dest: 'dist/'
					},

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
					},
					{
						expand: true,
						cwd: 'app/data',
						src: ['**/*.json', '!test/'],
						dest: 'dist/app/data',
						flatten: false
					},
					// FIXME use jquery-ui via bower instead!!!
					{
						expand: true,
						cwd: 'app/css/jquery-ui/images',
						src: ['**'],
						dest: 'dist/app/css/images',
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
					archive : "../ffxos/james/<%= pkg.name %>.zip"
				},
				files : [
					{
						expand: true,
						src: "**/*",
						cwd: "dist/"
					}, 
					{
						src: [
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

		, handlebars: {
			compile: {
				src: ['app/templates/**/*.tpl'],
				dest: 'app/js/templates.js',
				options: {
					simple: true,
					amd: true
					// namespace: false,
					// processName: function(filePath) {
					// 	filePath = filePath.split('templates/');
					// 	return filePath[1];
					// },
					// processPartialName: function(filePath) {
					// 	filePath = filePath.split('templates/');
					// 	return filePath[1];
					// }
				}
			}
		}

	});

	grunt.registerTask('build', ['clean', 'copy', 'handlebars', 'requirejs', 'cssmin', 'processhtml', 'htmlmin']);
	grunt.registerTask('ffxos', ['build', 'compress', 'exec:deploy_ffoxos']);
	grunt.registerTask('dev', ['handlebars', 'watch']);
};
