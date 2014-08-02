define([
	'marionette'
	, 'models/food'
	, 'views/list'
], function (Marionette, ExpenseModel, ListView) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/food/list-item.tpl',
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: 'app/templates/food/list.tpl',
		itemView: itemView,
		objectStore: 'foods'
	});

	return CompositeView;
});
