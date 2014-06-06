define([
	'marionette'
	, 'models/food'
	, 'views/list'
	, 'text!../../../templates/food/list.tpl'
	, 'text!../../../templates/food/list-item.tpl'
], function (Marionette, ExpenseModel, ListView, CompositeViewTemplate, ItemViewTemplate) {
	var itemView = Marionette.ItemView.extend({
		template: ItemViewTemplate,
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: CompositeViewTemplate,
		itemView: itemView,
		objectStore: 'foods'
	});

	return CompositeView;
});
