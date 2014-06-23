require.config({
	urlArgs: 'cb=' + Math.random(),
	baseUrl: '../../js',
	paths: {
		// LIBS
		'underscore': 'libs/bower/underscore/underscore',
		'jquery': 'libs/bower/jquery/dist/jquery.min',
		'backbone': 'libs/bower/backbone/backbone',
		'bootstrap': 'libs/bower/bootstrap/dist/js/bootstrap.min',
		'marionette': 'libs/bower/backbone.marionette/lib/backbone.marionette.min',
		'epoxy': 'libs/bower/backbone.epoxy/backbone.epoxy.min',
		'handlebars': 'libs/bower/handlebars/handlebars.min',
		'jquerymask': 'libs/bower/jQuery-Mask-Plugin/jquery.mask.min',
		'jqueryui': 'libs/custom/jquery-ui-custom.min',
		'text': 'libs/bower/requirejs-text/text',
		'templates': '../../templates/templates', // FIXME need it?
		'moment': 'libs/bower/moment/min/moment-with-langs.min'

		// Test
		, 'jasmine': '../test/jasmine/lib/jasmine-1.3.0/jasmine'
		, 'jasmine-html': '../test/jasmine/lib/jasmine-1.3.0/jasmine-html'
		, 'spec': 'spec/'
	},
	shim: {
		// LIBS
		'jquery': {
			exports: '$'
		},
		'bootstrap': {
			deps: ['jquery'],
			exports : 'bootstrap'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		'marionette': {
			deps: ['jquery', 'underscore', 'backbone'],
			exports: 'Marionette'
		},
		'handlebars': {
			exports: 'Handlebars'
		},
		'epoxy': {
			deps: ['jquery', 'underscore', 'backbone'],
			exports: 'Epoxy'
		},
		'jquerymask': {
			deps: ['jquery'],
			exports : 'jquerymask'
		},
		'jqueryui': {
			deps: ['jquery'],
			exports : 'jqueryui'
		},
		'moment': {
			exports : 'Moment'
		},

		'templates': {
			deps: ['handlebars']
		}

		// Test
		, 'jasmine' : {
			exports: 'jasmine'
		}
		, 'jasmine-html' : {
			deps: ['jasmine']
			, exports: 'jasmine'
		}
	}
	// paths: {
	// 	// LIBS
	// 	'underscore': '../../js/libs/vendor/underscore-min'
	// 	, 'jquery': '../../js/libs/vendor/jquery-min'
	// 	, 'jqueryui': '../../js/libs/vendor/jquery-ui.min'
	// 	, 'backbone': '../../js/libs/vendor/backbone-min'
	// 	, 'bootstrap': '../../js/libs/vendor/bootstrap-min'
	// 	, 'marionette': '../../js/libs/vendor/backbone.marionette-min'
	// 	, 'handlebars': '../../js/libs/vendor/handlebars'
	// 	, 'enum': '../../js/libs/vendor/enum-0.2.5.min'
	// 	, 'backgrid': '../../js/libs/vendor/backgrid.min'
	// 	, 'lunr': '../../js/libs/vendor/lunr.min'
	// 	, 'backgridFilter': '../../js/libs/vendor/backgrid-filter.min'
	// 	, 'backbonePageable': '../../js/libs/vendor/backbone-pageable'
	// 	, 'backgridPageable': '../../js/libs/vendor/backgrid-paginator.min'

	// 	// RequireJS
	// 	, 'text': '../../js/libs/vendor/text'

	// 	// App modules
	// 	, 'config': '../../js/config'
	// 	, 'app': '../../js/app'

	// 	// Test
	// 	, 'jasmine': 'lib/jasmine-1.3.0/jasmine'
	// 	, 'jasmine-html': 'lib/jasmine-1.3.0/jasmine-html'
	// 	, 'spec': 'spec/'
	// },
	// shim: {
	// 	// LIBS
	// 	'jquery': {
	// 		exports: '$'
	// 	},
	// 	'jqueryui': {
    //         deps: ['jquery'],
    //         exports: 'jqueryui'
    //     },
	// 	'bootstrap': {
	// 		deps: ['jquery'],
	// 		exports : 'bootstrap'
	// 	},
	// 	'underscore': {
	// 		exports: '_'
	// 	},
	// 	'backbone': {
	// 		deps: ['jquery', 'underscore'],
	// 		exports: 'Backbone'
	// 	},
	// 	'marionette': {
	// 		deps: ['jquery', 'underscore', 'backbone'],
	// 		exports: 'Marionette'
	// 	},
	// 	'handlebars': {
	// 		exports: 'Handlebars'
	// 	},
	// 	'enum': {
	// 		exports: 'Enum'
	// 	},
	// 	'backgrid': {
	// 		deps: ['jquery', 'underscore', 'backbone'],
	// 		exports: 'Backgrid'
	// 	},
	// 	'lunr': {
	// 		exports : 'Lunr'
	// 	},
	// 	'backgridFilter': {
	// 		deps: ['backgrid', 'lunr'],
	// 		exports : 'BackgridFilter'
	// 	},
	// 	'backbonePageable': {
	// 		deps: ['jquery', 'underscore', 'backbone', 'backgrid'],
	// 		exports : 'BackbonePageable'
	// 	},
	// 	'backgridPageable': {
	// 		deps: ['backgrid', 'backbonePageable'],
	// 		exports : 'BackgridPageable'
	// 	},

	// 	// RequireJS
	// 	'text': {
	// 		exports: 'text'
	// 	},

	// 	// App
	// 	'config': {
	// 		exports: 'config'
	// 	},

	// 	'app': {
	// 		exports: 'App'
	// 	},

	// 	'templates': {
	// 		deps: ['handlebars']
	// 	}

	// 	// Test
	// 	, 'jasmine' : {
	// 		exports: 'jasmine'
	// 	}
	// 	, 'jasmine-html' : {
	// 		deps: ['jasmine']
	// 		, exports: 'jasmine'
	// 	}
	// }
});

require([
	'require' // FIXME underscore instead?
	, 'jquery'
	, 'jasmine-html'
	, '../test/jasmine/spec/appSpec'
], function(_, $, Jasmine){
    var jasmineEnv = Jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new Jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
	jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

	jasmineEnv.execute();
});
