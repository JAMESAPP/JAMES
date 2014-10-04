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

			// TODO implement it!
			attrToView.totalPlanned = 0.00;

			attrToView.totalExpended = this.totalExpended();
			attrToView.balance = this.balance(attrToView.totalPlanned, attrToView.totalExpended);
			attrToView.status = this.status(attrToView.balance);

			return attrToView;
		}
		, edit: function(ev) {
			ev.preventDefault();
			window.location = '#expense/' + ev.currentTarget.getAttribute('id');
		}
		// FIXME round precision: 0.060000000000002274 with test 63.00
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
		, balance: function(totalPlanned, totalExpended) {
			return totalPlanned - totalExpended;
		}
		, status: function(balance) {
			var status = 'danger';
			if (balance > 0)
				status = 'success';
			else if (balance == 0)
				status = 'info';

			return status;
		}
	});

	return CompositeView;
});
