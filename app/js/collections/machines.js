define([
	'backbone'
], function (Backbone){
	var collection = Backbone.Collection.extend({
		url: "app/data/machines.json"
	});

	return collection;
});
