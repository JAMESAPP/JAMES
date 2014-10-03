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
		, serializeData: function() {
			var attrToView = _.clone(this.attributes) || {};

			attrToView.totalExpended = this.totalExpended();

			return attrToView;
		}
		, edit: function(ev) {
			ev.preventDefault();
			window.location = '#expense/' + ev.currentTarget.getAttribute('id');
		}
		, totalExpended: function() {
			var expenses = this.collection.toJSON(),
				ammount = 0.00,
				total = 0.00
			;

			_.forEach(expenses, function(element, index, list) {
				ammount = element.ammount.replace(',', '.');
				total += parseFloat(ammount);
			});

			return total;
		}
	});

	return CompositeView;
});
