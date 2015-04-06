require.config({
	baseUrl: 'app/js',
	paths: {
		'underscore': 'libs/bower/underscore/underscore',
		'jquery': 'libs/bower/jquery/dist/jquery.min',
		'backbone': 'libs/bower/backbone/backbone',
		'marionette': 'libs/bower/backbone.marionette/lib/backbone.marionette.min',
		'handlebars': 'libs/bower/handlebars/handlebars.runtime.min',
		'bootstrap': 'libs/bower/bootstrap/dist/js/bootstrap.min',
		'epoxy': 'libs/bower/backbone.epoxy/backbone.epoxy.min',
		'jquerymask': 'libs/bower/jQuery-Mask-Plugin/jquery.mask.min',
		'jqueryui': 'libs/custom/jquery-ui-custom.min',
		'text': 'libs/bower/requirejs-text/text',
		'moment': 'libs/bower/moment/min/moment-with-langs.min',
		'firebase': 'libs/bower/firebase/firebase',
		'firebaseSimpleLogin': 'libs/bower/firebase-simple-login/firebase-simple-login',
		'hideShowPassword': 'libs/bower/hideShowPassword/hideShowPassword.min',
		'localforage': 'libs/bower/localforage/dist/localforage.min',
		'goog-api': 'libs/bower/goog-api/dist/goog-api.min',
		'fullcalendar': 'libs/bower/fullcalendar/dist/fullcalendar.min',
		// FIXME update path when 0.0.7 or above is out!
		// 'james-data': 'libs/bower/james-data/dist/james-data.min'
		'james-data': 'libs/custom/test-dev/james-data/james-data.min'
	},
	shim: {
		'jquery': {
			exports: '$'
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
		'bootstrap': {
			deps: ['jquery'],
			exports : 'bootstrap'
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
		},
		'fullcalendar': {
			deps: ['jquery', 'moment'],
			exports : 'Fullcalendar'
		}
		// , 'localforage': {
		// 	deps: ['jquery'],
		// 	exports : 'localforage'
		// }
	}
});

require([
	'backbone'
	, 'app'
	, 'controllers/home'
	, 'controllers/dailyActivities'
	, 'views/menu'
	, 'goog-api'
], function(Backbone, App, HomeController, DailyActivitiesController, MenuView, Googapi) {
	// solve multiple events problem
	Backbone.View.prototype.close = function () {
		this.remove();
		this.unbind();
	};

	App.initializeDB();

	new HomeController();
	new DailyActivitiesController();

	Backbone.history.start();
	// FIXME not working out of box! Need use jquery to trigger url change! :(
	// Backbone.history.start({ pushState: true });

	App.menuRegion.show(new MenuView());
});
