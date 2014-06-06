define([
	'marionette'
	, 'models/gym'
	, 'views/list'
	, 'text!../../../templates/gym/list.tpl'
	, 'text!../../../templates/gym/list-item.tpl'
], function (Marionette, ExpenseModel, ListView, CompositeViewTemplate, ItemViewTemplate) {
	var itemView = Marionette.ItemView.extend({
		template: ItemViewTemplate,
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: CompositeViewTemplate,
		itemView: itemView,
		objectStore: 'gym'
	});

	return CompositeView;
});
