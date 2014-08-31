define([
	'backbone'
], function (Backbone) {
	var collection = Backbone.Collection.extend({
		url: "app/data/foodGroups.json"
	});

	return collection;
});
