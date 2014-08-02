define([
	'marionette'
	, 'models/gym'
	, 'views/list'
], function (Marionette, ExpenseModel, ListView) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/gym/list-item.tpl',
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: 'app/templates/gym/list.tpl',
		itemView: itemView,
		objectStore: 'gym'
	});

	return CompositeView;
});
