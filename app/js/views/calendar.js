define([
	'marionette'
	, 'underscore'
	, 'moment'
	, 'app'
	, 'collections/generic'
], function (Marionette, _, Moment, App, Collection) {

	/*
	 * Must implement the follow:
	 * - itemView (tagName and template)
	 * - template of item view
	 * - Must receive a collection in constructor
	 * - Must define objectStore (string)
	 * - Optional: implement getEventSource if use the calendar view
	 */
	var itemView = Marionette.ItemView.extend({
		itemViewContainer: '#tbodyItem'
		, className: 'box'
		, tagName: 'div'

		// template: 'app/templates/contraceptive/list.tpl'
		// , objectStore: 'contraceptives'


		, events: {
			'shown.bs.tab #tabCalendar': 'startCalendar'
			, 'click .btn-danger': 'deleteAll'
		}
		, initialize: function(coll, model) {
			this.collection = coll;

			// Fix default behavior of marionette.js when receive a collection constructor
			// this.model = undefined;
			this.model = model;
		}



		/*
		 * Default implemetation removed the last character (assume that last character is 's').
		 * You can override it, of course.
		 */
		, entitySingular: function () {
			return this.objectStore.substring(0, this.objectStore.length - 1);
		}

		, sync: function(ev) {
			ev.preventDefault();

			// Workarround to double call of .delete and .btn-warning
			if (_.contains(ev.target.classList, 'delete'))
				return;

			console.log('sync not implemented...');
		}
		, deleteAll: function(ev) {
			var self = this;

			ev.preventDefault();

			App.indexedDB.db.transaction([this.objectStore], 'readwrite').objectStore(this.objectStore).clear().onsuccess = function(e) {
				self.collection = new Collection();
			};
		}
		, edit: function (ev) {
			ev.preventDefault();
			window.location.href = '#' + this.entitySingular +  '/' + ev.currentTarget.getAttribute('id');
		}

		/*
		 * Need implement getEventSource()
		 */
		, startCalendar: function(ev) {
			var coll = this.collection.toJSON(),
				self = this
			;

			this.$el.find('#calendar').fullCalendar({
				defaultDate: new Moment()
				, eventClick: function(event, jsEvent, view) {
					window.location.href = '#' + this.entitySingular +  '/' + event.id;
				}
				, header: {
					left: 'prev,next',
					center: 'title',
					right: 'today'
				}
				, editable: false
				, eventLimit: false
				, eventSources: self.getEventSource()
			});
		}
		/*
		 * Need a real implementation
		 */
		, getEventSource: function() {
			return [];
		}
	});

	return itemView;
});
