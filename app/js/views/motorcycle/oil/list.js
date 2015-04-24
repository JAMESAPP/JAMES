define([
	'underscore'
	, 'moment'
	, 'views/calendar'
], function (_, Moment, CalendarView) {
	var calendarView = CalendarView.extend({
		template: 'app/templates/motorcycle/oil/list.tpl'
		, objectStore: 'oils'
		, getEventSource: function() {
			var arr = [],
				el
			;

			_.forEach(this.collection.toJSON(), function(element, index, list) {
				el = {allDay: true};
				el.id = element.id;
				el.start = Moment(element.date, 'DD/MM/YYYY');
				el.title = 'KM ' + element.KM + ' $' + element.amount;

				arr.push(el);
			});
			
			return  [
				{
					events: arr,
					backgroundColor: 'green'
				}
			];
		}
	});

	return calendarView;
});

// define([
// 	'underscore'
// 	, 'marionette'
// 	, 'views/list'
// ], function (_, Marionette, ListView) {
// 	var itemView = Marionette.ItemView.extend({
// 		template: 'app/templates/motorcycle/oil/list-item.tpl',
// 		tagName: 'tr'
// 	});

// 	var CompositeView = ListView.extend({
// 		template: 'app/templates/motorcycle/oil/list.tpl',
// 		itemView: itemView,
// 		objectStore: 'oils'
// 		, events: function() {
// 			return _.extend({}, ListView.prototype.events, {
// 				'click .edit-td': 'edit'
// 			});
// 		}
// 		, edit: function(ev) {
// 			ev.preventDefault();
// 			window.location = '#motorcycle/oil/' + ev.currentTarget.getAttribute('id');
// 		}
// 	});

// 	return CompositeView;
// });
