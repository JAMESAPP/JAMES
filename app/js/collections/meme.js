define([
		'backbone'
], function (Backbone){
		var MemeCollection = Backbone.Collection.extend({

				url: "app/data/meme.json",

				initialize: function() {
						this.fetch({async: false});
				},

				parse: function(data) {
						return data.memes;
				}
		});

		return MemeCollection;
});
