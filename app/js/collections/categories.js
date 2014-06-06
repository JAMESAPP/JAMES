define([
	'backbone'
], function (Backbone){
	var collection = Backbone.Collection.extend({
		url: "app/data/categories.json"
	});

	return collection;
});
