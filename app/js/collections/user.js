define([
		'backbone'
], function (Backbone){
		var userCollection = Backbone.Collection.extend({

				url: "data/user.json",

				initialize: function() {
						this.fetch({async: false});
				},

				parse: function(data) {
						return data.users;
				}
		});

		return userCollection;
});
