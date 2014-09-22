define([
	'underscore'
	, 'marionette'
	, 'models/expense'
	, 'views/list'
], function (_, Marionette, ExpenseModel, ListView) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/expense/list-item.tpl',
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: 'app/templates/expense/list.tpl',
		itemView: itemView,
		objectStore: 'expenses'
		, events: function() {
			return _.extend({}, ListView.prototype.events, {
				'click .edit-td': 'edit'
			});
		}
		, edit: function(ev) {
			ev.preventDefault();
			window.location = '#expense/' + ev.currentTarget.getAttribute('id');
		}
	});

	return CompositeView;
});
