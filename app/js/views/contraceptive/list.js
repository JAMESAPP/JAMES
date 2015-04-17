define([
	'underscore'
	, 'marionette'
	, 'moment'
	, 'app'
	, 'models/contraceptive'
	, 'collections/generic'
	, 'fullcalendar'
], function (_, Marionette, Moment, App, ContraceptiveModel, Collection) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/contraceptive/list.tpl'
		, objectStore: 'contraceptives'
		, tagName: 'div'
		, className: 'box'
		, events: {
			'shown.bs.tab #tabCalendar': 'startCalendar'
			, 'click .btn-warning': 'deleteAll'
		}
		, initialize: function(coll, model) {
			this.collection = coll;
			this.model = model;
		}
		, serializeData: function() {
			var attrToView = _.clone(this.attributes) || {},
				notTakenYet,
				taken,
				missed,
				voidDay,
				isMenstruating,
				today = new Moment(),
				dt
			;

			notTakenYet = _.filter(this.collection.toJSON(), function(model) {
				return model.state == 'NOT_TAKEN_YET' && today.isSame(new Moment(model.date, 'DD/MM/YYYY'), 'month');
			});
			taken = _.filter(this.collection.toJSON(), function(model) {
				return model.state == 'TAKEN' && today.isSame(new Moment(model.date, 'DD/MM/YYYY'), 'month');
			});
			missed = _.filter(this.collection.toJSON(), function(model) {
				return model.state == 'MISSED' && today.isSame(new Moment(model.date, 'DD/MM/YYYY'), 'month');
			});
			voidDay = _.filter(this.collection.toJSON(), function(model) {
				return model.state == 'VOID' && today.isSame(new Moment(model.date, 'DD/MM/YYYY'), 'month');
			});
			isMenstruating = _.filter(this.collection.toJSON(), function(model) {
				return model.state == 'IS_MENSTRUATING' && today.isSame(new Moment(model.date, 'DD/MM/YYYY'), 'month');
			});

			attrToView.notTakenYet = notTakenYet.length;
			attrToView.taken = taken.length;
			attrToView.missed = missed.length;
			attrToView.void = voidDay.length;
			attrToView.isMenstruating = isMenstruating.length;

			return attrToView;
		}
		
		, startCalendar: function(ev) {
			var self = this;

			this.$el.find('#calendar').fullCalendar({
				defaultDate: new Moment()
				, eventClick: function(event, jsEvent, view) {
					// window.location.href = '#contraceptive/' + event.id;
					window.location.href = '#' + self.objectStore.substring(0, self.objectStore.length - 1) +  '/' + event.id;
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

		, getEventSource: function() {
			var coll = this.collection.toJSON();

			return  [
				{
					events: this.filterCollByState(coll, 'TAKEN'),
					backgroundColor: 'green'
				},
				{
					events: this.filterCollByState(coll, 'MISSED'),
					backgroundColor: 'red'
				},
				{
					events: this.filterCollByState(coll, 'NOT_TAKEN_YET'),
					backgroundColor: 'yellow'
				},
				{
					events: this.filterCollByState(coll, 'VOID'),
					backgroundColor: 'grey'
				},
				{
					events: this.filterCollByState(coll, 'IS_MENSTRUATING'),
					backgroundColor: 'blue'
				}
			];
			
		}

		/*
		 * Filter and return elements by state to adapt to fullcalendar data model.
		 *
		 * Contraceptive data model: see contraceptive model class;
		 * Fullcalendar data model: {id: 1, start: '2015-04-01', title: 'taken', allDay: true};
		 */
		, filterCollByState: function(coll, state) {
			var collByState = _.filter(coll, function(model) {
					return model.state == state;
				}),
				filtered = [],
				el
			;

			_.forEach(collByState, function(element, index, list) {
				el = {allDay: true};
				el.id = element.id;
				el.start = Moment(element.date, 'DD/MM/YYYY');
				el.title = element.state;

				filtered.push(el);
			});

			return filtered;
		}

		, deleteAll: function(ev) {
			ev.preventDefault();

			App.indexedDB.db.transaction([this.objectStore], 'readwrite').objectStore(this.objectStore).clear().onsuccess = function(e) {
				window.location.href = '#about';
			};
		}
	});

	return itemView;
});
