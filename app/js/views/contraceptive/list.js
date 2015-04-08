define([
	'underscore'
	, 'marionette'
	, 'moment'
	, 'app'
	, 'models/contraceptive'
	, 'fullcalendar'
], function (_, Marionette, Moment, App, ContraceptiveModel) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/contraceptive/list.tpl',
		tagName: 'div',
		className: 'box'

		, initialize: function(coll, model) {
			this.collection = coll;
			this.model = model;
		}

		, onShow: function() {
			var coll = this.collection.toJSON();

			this.$el.find('#calendar').fullCalendar({
				defaultDate: new Moment()
				, eventClick: function(event, jsEvent, view) {
					window.location.href = '#contraceptive/' + event.id;
				}
				, header: {
					left: 'prev,next',
					center: 'title',
					right: 'today'
				}
				, editable: false
				, eventLimit: false
				, eventSources: [
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
				]
			});
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
	});

	return itemView;
});
