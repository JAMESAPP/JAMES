define([
	'underscore'
	, 'marionette'
	, 'views/list'
], function (_, Marionette, ListView) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/motorcycle/oil/list-item.tpl',
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: 'app/templates/motorcycle/oil/list.tpl',
		itemView: itemView,
		objectStore: 'oils'
		, events: function() {
			return _.extend({}, ListView.prototype.events, {
				'click .edit-td': 'edit'
			});
		}
		, edit: function(ev) {
			ev.preventDefault();
			window.location = '#motorcycle/oil/' + ev.currentTarget.getAttribute('id');
		}
	});

	return CompositeView;
});
