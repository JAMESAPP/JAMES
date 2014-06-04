define([
	'marionette'
	, 'app'
	, 'collections/expenses'
	, 'text!../../../templates/expense/list.tpl'
	, 'text!../../../templates/expense/list-item.tpl'
], function (Marionette, App, ExpenseCollection, CompositeViewTemplate, ItemViewTemplate) {
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

		initialize: function(expenses) {
			this.collection = new ExpenseCollection(expenses);
		}

		, events: {
			'click .btn-warning': 'sync'
			, 'click .delete': 'delete'
		}
		, sync: function(ev) {
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
