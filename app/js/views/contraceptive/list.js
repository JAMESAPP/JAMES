define([
	'underscore'
	, 'marionette'
	, 'moment'
	, 'models/contraceptive'
	, 'fullcalendar'
], function (_, Marionette, Moment, ContraceptiveModel) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/contraceptive/list.tpl',
		tagName: 'div',
		className: 'box'

		, initialize: function(coll, model) {
			this.collection = coll;
			this.model = model;
		}

		, onShow: function() {
			var taken = [
				{id: 1, title: 'taken', start: '2015-04-01', allDay: true},
				{id: 2, title: 'taken', start: '2015-04-02', allDay: true},
				{id: 3, title: 'taken', start: '2015-04-03', allDay: true},
				{id: 4, title: 'taken', start: '2015-04-04', allDay: true},
				{id: 5, title: 'taken', start: '2015-04-05', allDay: true}
			],
				missed = [
					{id: 11, title: 'missed', start: '2015-04-06', allDay: true},
					{id: 12, title: 'missed', start: '2015-04-07', allDay: true},
					{id: 13, title: 'missed', start: '2015-04-08', allDay: true},
					{id: 14, title: 'missed', start: '2015-04-09', allDay: true},
					{id: 15, title: 'missed', start: '2015-04-10', allDay: true}
				],
				notTakenYet = [
					{id: 6, title: 'not taken yet!', start: '2015-04-11', allDay: true},
					{id: 7, title: 'not taken yet!', start: '2015-04-12', allDay: true},
					{id: 8, title: 'not taken yet!', start: '2015-04-13', allDay: true},
					{id: 9, title: 'not taken yet!', start: '2015-04-14', allDay: true},
					{id: 10, title: 'not taken yet!', start: '2015-04-15', allDay: true}
				],
				voidDay = [
					{id: 16, title: 'void', start: '2015-04-16', allDay: true},
					{id: 17, title: 'void', start: '2015-04-17', allDay: true},
					{id: 18, title: 'void', start: '2015-04-18', allDay: true},
					{id: 19, title: 'void', start: '2015-04-19', allDay: true},
					{id: 20, title: 'void', start: '2015-04-20', allDay: true}
				],
				isMenstruating = [
					{id: 21, title: 'is menstruating', start: '2015-04-21', allDay: true},
					{id: 22, title: 'is menstruating', start: '2015-04-22', allDay: true},
					{id: 23, title: 'is menstruating', start: '2015-04-23', allDay: true},
					{id: 24, title: 'is menstruating', start: '2015-04-24', allDay: true},
					{id: 25, title: 'is menstruating', start: '2015-04-25', allDay: true}
				]
			;
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
						events: taken,
						backgroundColor: 'green'
					},
					{
						events:missed,
						backgroundColor: 'red'
					},
					{
						events: notTakenYet,
						backgroundColor: 'yellow'
					},
					{
						events: voidDay,
						backgroundColor: 'grey'
					},
					{
						events: isMenstruating,
						backgroundColor: 'blue'
					}
				]
			});
		}
	});

	return itemView;
});
