define([
	'marionette'
	, 'models/expense'
	, 'views/list'
], function (Marionette, ExpenseModel, ListView) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/expense/list-item.tpl',
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: 'app/templates/expense/list.tpl',
		itemView: itemView,
		objectStore: 'expenses'
	});

	return CompositeView;
});
