define([
	'underscore'
	, 'marionette'
	, 'models/contraceptive'
	, 'views/list'
], function (_, Marionette, ContraceptiveModel, ListView) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/contraceptive/list-item.tpl',
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: 'app/templates/contraceptive/list.tpl',
		itemView: itemView,
		objectStore: 'contraceptives'
		, events: function() {
			return _.extend({}, ListView.prototype.events, {
				'click .edit-td': 'edit'
			});
		}
		, serializeData: function() {
			var attrToView = _.clone(this.attributes) || {};

			// TODO implement it!

			return attrToView;
		}
		, edit: function(ev) {
			ev.preventDefault();
			window.location = '#contraceptive/' + ev.currentTarget.getAttribute('id');
		}
	});

	return CompositeView;
});
