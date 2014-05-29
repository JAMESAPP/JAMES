define([
	'marionette'
	, 'collections/expenses'
	, 'text!../../../templates/expense/list.tpl'
	, 'text!../../../templates/expense/list-item.tpl'
], function (Marionette, ExpenseCollection, CompositeViewTemplate, ItemViewTemplate) {
	var itemView = Marionette.ItemView.extend({
		template: ItemViewTemplate,
		tagName: 'tr'
	});

	var CompositeView = Marionette.CompositeView.extend({
		template: CompositeViewTemplate,
		itemView: itemView,
		itemViewContainer: '#tbodyItem',
		className: 'box',
		tagName: 'div',
		collection: new ExpenseCollection()
		, events: {
			'click #btnClearAll': 'clearAll'
			, 'click .delete': 'delete'
		}
		, clearAll: function(ev) {
			ev.preventDefault();
			console.log('clear all not implemented...');
		}
		, delete: function(ev) {
			ev.preventDefault();
			console.log('delete not implemented...');
		}
	});

	return CompositeView;
});
