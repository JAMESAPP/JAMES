define([
	'marionette'
	, 'underscore'
	, 'app'
], function (Marionette, _, App) {

	/*
	 * Must implement the follow:
	 * - itemView (tagName and template)
	 * - template of composite view
	 * - Must receive a collection in constructor
	 * - Must define objectStore (string)
	 */
	var CompositeView = Marionette.CompositeView.extend({
		itemViewContainer: '#tbodyItem',
		className: 'box',
		tagName: 'div',

		initialize: function(coll, model) {
			this.collection = coll;

			// Fix default behavior of marionette.js when receive a collection constructor
			// this.model = undefined;
			this.model = model;
		}

		, events: {
			'click .btn-warning': 'sync'
			, 'click .delete': 'deleteAll'
			, 'click .btn-danger': 'delete'
		}
		, sync: function(ev) {
			ev.preventDefault();
			console.log('clear all not implemented...');
		}
		, delete: function(ev) {
			ev.preventDefault();

			var self = this;
			var id = parseInt(ev.currentTarget.getAttribute('id'));
			App.indexedDB.db.transaction([this.objectStore], 'readwrite').objectStore(this.objectStore).delete(id).onsuccess = function(e) {
				var model = self.collection.where({id: id});
				self.collection.remove(model);
			};
		}
		, deleteAll: function(ev) {
			var self = this;

			ev.preventDefault();

			console.log(this.collection);

			_.forEach(this.collection.toJSON(), function(model) {
				App.indexedDB.db.transaction([self.objectStore], 'readwrite').objectStore(self.objectStore).delete(model.id).onsuccess = function(e) {
					self.$el.find('#spanMessage').removeClass();
					self.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-danger');
					// FIXME if I have 30 entities, it will have to wait 5000 * 30 = 150000 ms to message fadeout?
					self.$el.find('#spanMessage').html('Cleaned all registers!!!').fadeIn().delay(5000).fadeOut();

					var m = self.collection.where({id: model.id});
					self.collection.remove(m);
				};
			});
		}
	});

	return CompositeView;
});
