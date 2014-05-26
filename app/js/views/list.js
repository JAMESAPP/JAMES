define([
	'marionette'
	, 'app'
], function (Marionette, App) {
	var ListView = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'box'
		, events: {
			'click #btnDelete': 'delete'
		}
		, template: undefined
		, objectStore: undefined

		, initialize: function(collection) {
			console.log('Not implemented yet!!');
		}

		, delete: function(ev) {
			ev.preventDefault();
			console.error('Not implemented yet!!');
		}
	});

	return ListView;
});
