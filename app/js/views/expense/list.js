define([
	'underscore'
	, 'moment'
	, 'views/calendar'
], function (_, Moment, CalendarView) {
	var calendarView = CalendarView.extend({
		template: 'app/templates/expense/list.tpl'
		, objectStore: 'expenses'
		, getEventSource: function() {
			var arr = [],
				el
			;

			_.forEach(this.collection.toJSON(), function(element, index, list) {
				el = {allDay: true};
				el.id = element.id;
				el.start = Moment(element.date, 'DD/MM/YYYY');
				el.title = '$' + element.amount;

				arr.push(el);
			});
			
			return  [
				{
					events: arr,
					backgroundColor: 'red'
				}
			];
		}
	});

	return calendarView;
});
