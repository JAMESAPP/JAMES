define([
	'marionette'
	, 'views/list'
], function (Marionette, ListView) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/food/list-itemFood.tpl',
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: 'app/templates/food/listFood.tpl',
		itemView: itemView,
		objectStore: 'foods'
	});

	return CompositeView;
});
