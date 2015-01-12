define([
	'underscore'
	, 'marionette'
	, 'models/expense'
	, 'views/list'
], function (_, Marionette, ExpenseModel, ListView) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/motorcycle/list-item.tpl',
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: 'app/templates/motorcycle/list.tpl',
		itemView: itemView,
		objectStore: 'motorcycles'
		, events: function() {
			return _.extend({}, ListView.prototype.events, {
				'click .edit-td': 'edit'
			});
		}
		, edit: function(ev) {
			ev.preventDefault();
			window.location = '#motorcycle/' + ev.currentTarget.getAttribute('id');
		}
	});

	return CompositeView;
});
