define([
	'marionette'
	, 'models/expense'
	, 'views/list'
	, 'text!../../../templates/timesheet/list.tpl'
	, 'text!../../../templates/timesheet/list-item.tpl'
], function (Marionette, ExpenseModel, ListView, CompositeViewTemplate, ItemViewTemplate) {
	var itemView = Marionette.ItemView.extend({
		template: ItemViewTemplate,
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: CompositeViewTemplate,
		itemView: itemView,
		objectStore: 'expenses'
	});

	return CompositeView;
});
