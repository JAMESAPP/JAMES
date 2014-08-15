define([
	'backbone'
	, 'app'
	, 'views/about'
], function (Backbone, App, AboutView) {
	var HomeController = Backbone.Router.extend({
		routes: {
			'': 'index',
			'about': 'about'
		},

		index: function() {
			this.navigate("about", {trigger: true});
		},

		about: function() {
			App.mainRegion.show(new AboutView());
		}
	});

	return HomeController;
});
