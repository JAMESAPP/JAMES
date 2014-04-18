require.config({
		paths: {
				// LIBS
				'underscore': 'libs/vendor/underscore-min',
				'jquery': 'libs/vendor/jquery-min',
				'backbone': 'libs/vendor/backbone-min',
				'bootstrap': 'libs/vendor/bootstrap-min',
				'marionette': 'libs/vendor/backbone.marionette-min',
				'handlebars': 'libs/vendor/handlebars',

				// RequireJS
				'text': 'libs/vendor/text',

				// App modules
				'config': 'config',
				'templates': '../templates/templates',
				'AboutView': 'views/about',
				'AboutView': 'views/error',
				'AboutView': 'views/featured'
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

				// RequireJS
				'text': {
						exports: 'text'
				},

				// App
				'config': {
						exports: 'config'
				},
				'templates': {
						deps: ['handlebars']
				},
				'user': {
						exports: 'user'
				}
		}
});

// TODO put everybody in router.js
require([
		'backbone'
		, 'app'
		, 'controllers/home'
		, 'controllers/user'
		, 'controllers/marionette'
		, 'views/menu'
		, 'views/footer'
], function(Backbone, App, HomeController, UserController, MarionetteController, MenuView, FooterView) {
		// solve multiple events problem
		Backbone.View.prototype.close = function () {
				this.remove();
				this.unbind();
		};

		// start routers
		new HomeController();
		new UserController();
		new MarionetteController();

		Backbone.history.start();
		// FIXME not working out of box! Need use jquery to trigger url change! :(
		// Backbone.history.start({ pushState: true });

		App.menuRegion.show(new MenuView());
		App.footerRegion.show(new FooterView());
});
