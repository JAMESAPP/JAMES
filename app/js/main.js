require.config({
	baseUrl: 'app/js',
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
		'jqueryui': 'libs/vendor/jquery-ui-custom.min',

		// RequireJS
		'text': 'libs/vendor/text',

		// App modules
		'config': 'config',
		'templates': '../templates/templates'
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

		// App
		'config': {
			exports: 'config'
		},
		'templates': {
			deps: ['handlebars']
		}
	}
});

require([
	'backbone'
	, 'app'
	, 'controllers/home'
	, 'controllers/user'
	, 'controllers/marionette'
	, 'controllers/dailyActivities'
	, 'views/menu'
	, 'views/footer'
], function(Backbone, App, HomeController, UserController, MarionetteController, DailyActivitiesController, MenuView, FooterView) {
	// solve multiple events problem
	Backbone.View.prototype.close = function () {
		this.remove();
		this.unbind();
	};

	// start routers
	new HomeController();
	new UserController();
	new MarionetteController();
	new DailyActivitiesController();

	Backbone.history.start();
	// FIXME not working out of box! Need use jquery to trigger url change! :(
	// Backbone.history.start({ pushState: true });

	App.menuRegion.show(new MenuView());
	App.footerRegion.show(new FooterView());

	App.initializeDB();
});
