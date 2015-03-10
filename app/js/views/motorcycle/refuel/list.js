define([
	'underscore'
	, 'marionette'
	, 'views/list'
], function (_, Marionette, ListView) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/motorcycle/refuel/list-item.tpl',
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: 'app/templates/motorcycle/refuel/list.tpl',
		itemView: itemView,
		objectStore: 'refuels'
		, events: function() {
			return _.extend({}, ListView.prototype.events, {
				'click .edit-td': 'edit'
			});
		}
		, edit: function(ev) {
			ev.preventDefault();
			window.location = '#motorcycle/refuel/' + ev.currentTarget.getAttribute('id');
		}
	});

	return CompositeView;
});
