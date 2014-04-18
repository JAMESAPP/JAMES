define([
		'backbone'
		, 'app'
		, 'views/about'
		, 'views/error'
		, 'views/featured'
		, 'views/generic'
], function (Backbone, App, AboutView, ErrorView, FeaturedView, GenericView) {
		var HomeController = Backbone.Router.extend({
				routes: {
						'': 'index',
						'about': 'about',
						'error': 'error',
						'featured': 'featured',
						'generic(/*tpl)': 'generic'
				},

				index: function() {
						this.navigate("about", {trigger: true});
				},

				about: function() {
						App.mainRegion.show(new AboutView());
				},

				error: function() {
						App.mainRegion.show(new ErrorView());
				},

				featured: function() {
						App.mainRegion.show(new FeaturedView());
				},

				generic: function(tpl) {
						console.log("router generic - template is: " + tpl);

						if (tpl == undefined)
								tpl = 'generic';

						App.mainRegion.show(new GenericView({tpl: tpl}));
				}
		});

		return HomeController;
});
