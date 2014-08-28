define([
	'marionette'
	, 'views/list'
], function (Marionette, ListView) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/food/list-itemMeal.tpl',
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: 'app/templates/food/listMeal.tpl',
		itemView: itemView,
		objectStore: 'foods'
	});

	return CompositeView;
});
