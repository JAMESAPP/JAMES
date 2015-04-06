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
				{title: 'taken', start: '2015-04-01', allDay: true},
				{title: 'taken', start: '2015-04-02', allDay: true},
				{title: 'taken', start: '2015-04-03', allDay: true},
				{title: 'taken', start: '2015-04-04', allDay: true},
				{title: 'taken', start: '2015-04-05', allDay: true}
			],
				notTakenYet = [
					{title: 'not taken yet!', start: '2015-04-11', allDay: true},
					{title: 'not taken yet!', start: '2015-04-12', allDay: true},
					{title: 'not taken yet!', start: '2015-04-13', allDay: true},
					{title: 'not taken yet!', start: '2015-04-14', allDay: true},
					{title: 'not taken yet!', start: '2015-04-15', allDay: true}
				],
				missed = [
					{title: 'missed', start: '2015-04-06', allDay: true},
					{title: 'missed', start: '2015-04-07', allDay: true},
					{title: 'missed', start: '2015-04-08', allDay: true},
					{title: 'missed', start: '2015-04-09', allDay: true},
					{title: 'missed', start: '2015-04-10', allDay: true}
				],
				voidDay = [
					{title: 'void', start: '2015-04-16', allDay: true},
					{title: 'void', start: '2015-04-17', allDay: true},
					{title: 'void', start: '2015-04-18', allDay: true},
					{title: 'void', start: '2015-04-19', allDay: true},
					{title: 'void', start: '2015-04-20', allDay: true}
				],
				isMenstruating = [
					{title: 'is menstruating', start: '2015-04-21', allDay: true},
					{title: 'is menstruating', start: '2015-04-22', allDay: true},
					{title: 'is menstruating', start: '2015-04-23', allDay: true},
					{title: 'is menstruating', start: '2015-04-24', allDay: true},
					{title: 'is menstruating', start: '2015-04-25', allDay: true}
				]
			;
			this.$el.find('#calendar').fullCalendar({
				defaultDate: new Moment()
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
						events: notTakenYet,
						backgroundColor: 'yellow'
					},
					{
						events:missed,
						backgroundColor: 'red'
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
