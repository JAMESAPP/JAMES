define([
	'underscore'
	, 'marionette'
	, 'models/expense'
	, 'views/list'
	, 'text!../../../templates/timesheet/list.tpl'
	, 'text!../../../templates/timesheet/list-item.tpl'
], function (_, Marionette, ExpenseModel, ListView, CompositeViewTemplate, ItemViewTemplate) {
	var itemView = Marionette.ItemView.extend({
		template: ItemViewTemplate,
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: CompositeViewTemplate,
		itemView: itemView,
		objectStore: 'timesheet'
		, serializeData: function() {
			var attrToView = _.clone(this.attributes) || {};

			// TODO filter by month
			attrToView.selectMonth = [
				{label: 'January', value: 0}
				, {label: 'February', value: 1}
				, {label: 'March', value: 2}
				, {label: 'April', value: 3}
				, {label: 'May', value: 4}
				, {label: 'June', value: 5}
				, {label: 'July', value: 6}
				, {label: 'August', value: 7}
				, {label: 'September', value: 8}
				, {label: 'October', value: 9}
				, {label: 'November', value: 10}
				, {label: 'December', value: 11}
			];

			return attrToView;
		}

	});

	return CompositeView;
});
