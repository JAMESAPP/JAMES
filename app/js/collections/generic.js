define([
		'backbone'
], function (Backbone){
		var GenericCollection = Backbone.Collection.extend({

				url: "app/data/generic.json",

				initialize: function() {
						this.fetch({async: false});
				},

				parse: function(data) {
						return data.generic;
				}
		});

		return GenericCollection;
});
