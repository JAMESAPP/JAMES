define([
	'backbone'
], function (Backbone){
	var collection = Backbone.Collection.extend({
		url: "app/data/categories.json",

		initialize: function() {
			this.fetch({async: false});
		}

		// , parse: function(data) {
		// 	console.log(data);
		// 	return data.full_name;
		// }
	});

	return collection;
});
