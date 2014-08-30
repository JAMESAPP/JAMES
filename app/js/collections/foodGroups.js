define([
	'backbone'
], function (Backbone) {
	var collection = Backbone.Collection.extend({
		url: "app/data/foods.json"
	});

	return collection;
});
