define([
	'marionette'
	, 'models/expense'
	, 'views/list'
], function (Marionette, ExpenseModel, ListView) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/motorcycle/list-item.tpl',
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: 'app/templates/motorcycle/list.tpl',
		itemView: itemView,
		objectStore: 'motorcycles'
	});

	return CompositeView;
});
