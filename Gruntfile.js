'use strict';

module.exports = function(grunt) {
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

		requirejs: {
			compile: {
				options: {
					baseUrl: "app/js",
					mainConfigFile: "app/js/main.js",
					name: "main",
					out: "dist/<%= pkg.name %>.min.js"
				}
			}
		}

		, cssmin: {
			combine: {
				files: {
					// 'dist/main.min.css': ['app/css/main.css', 'app/js/libs/bower/bootstrap/dist/css/bootstrap.min.css', 'app/js/libs/bower/bootstrap/dist/css/bootstrap-theme.min.css', 'app/css/jquery-ui/jquery-ui.min.css'],
					'dist/main.min.css': ['app/css/main.css'],
					options: {
						keepSpecialComments: 0
					}
				}
			}
		}
	});

	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// grunt.registerTask('default', ['jshint', 'requirejs']);
	grunt.registerTask('build', ['requirejs', 'cssmin']);

};
