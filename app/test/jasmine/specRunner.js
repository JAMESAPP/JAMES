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
		'moment': 'libs/bower/moment/min/moment-with-langs.min',
		'firebase': 'libs/bower/firebase/firebase',
		'firebaseSimpleLogin': 'libs/bower/firebase-simple-login/firebase-simple-login',
		'hideShowPassword': 'libs/bower/hideShowPassword/hideShowPassword.min'

		// Test
		, 'jasmine': '../test/jasmine/lib/jasmine-1.3.0/jasmine'
		, 'jasmine-html': '../test/jasmine/lib/jasmine-1.3.0/jasmine-html'
		, 'spec': '../test/jasmine/spec'
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
		'firebase': {
			exports: 'Firebase'
		},
		'firebaseSimpleLogin': {
			exports: 'FirebaseSimpleLogin'
		},
		'hideShowPassword': {
			deps: ['jquery'],
			exports : 'HideShowPassword'
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
});

require([
	'jasmine-html'
	, '../test/jasmine/spec/appSpec'
	, '../test/jasmine/spec/crudSpec'
	, '../test/jasmine/spec/expenseSpec'
	, '../test/jasmine/spec/googleDriveSpec'
	, '../test/jasmine/spec/motorcycleSpec'
	, '../test/jasmine/spec/timesheetSpec'
	, '../test/jasmine/spec/settingsSpec'
], function(Jasmine) {
    var jasmineEnv = Jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new Jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
	jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

	jasmineEnv.execute();
});
