define([
		'backbone'
], function (Backbone) {
		var FeaturedCollection = Backbone.Collection.extend({

				url: "app/data/featured.json",

				initialize: function() {
						this.fetch({async: false});
				},

				parse: function(data) {
						return data.featured;
				}
		});

		return FeaturedCollection;
});
