define([
	'underscore'
	, 'marionette'
	, 'moment'
	, 'config'
	, 'models/expense'
	, 'views/list'
	, 'text!../../../templates/timesheet/list.tpl'
	, 'text!../../../templates/timesheet/list-item.tpl'
], function (_, Marionette, Moment, Config, ExpenseModel, ListView, CompositeViewTemplate, ItemViewTemplate) {
	var itemView = Marionette.ItemView.extend({
		template: ItemViewTemplate,
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: CompositeViewTemplate,
		itemView: itemView,
		objectStore: 'timesheet'
		, serializeData: function() {
			var attrToView = _.clone(this.attributes) || {};

			// console.log(this.collection);
			// console.log(this.attributes);
			// console.log(attrToView);

			// Total Days Late to Work
			var modelStart;
			var configStart = Moment(Config.timesheet.startTime, 'HH:mm');
			var later = _.filter(this.collection.toJSON(), function(model) {
				modelStart = Moment(model.startTime, 'HH:mm');
				return Moment(modelStart).isAfter(configStart);
			});
			attrToView.totalLater = later.length;

			// Total Minutes After Start
			var totalMinutesLateByDay;
			var totalMinutesLaterAfterStart = Moment('00:00', 'HH:mm');
			_.forEach(later, function(element, index, list) {
				totalMinutesLateByDay = Moment(element.startTime, 'HH:mm');
				totalMinutesLateByDay.subtract(configStart);
				totalMinutesLaterAfterStart.add(totalMinutesLateByDay);
			});
			attrToView.totalMinutesLaterAfterStart = totalMinutesLaterAfterStart.minutes();

			// Total Extra Time
			// Extra time before start
			var daysWithExtraTimeBeforeStart = _.filter(this.collection.toJSON(), function(model) {
				modelStart = Moment(model.startTime, 'HH:mm');
				return Moment(modelStart).isBefore(configStart);
			});
			var hours;
			var minutes;
			var startTimeDay;
			var officialStartTime;
			var totalExtraTimeBeforeStart = Moment('00:00', 'HH:mm');
			_.forEach(daysWithExtraTimeBeforeStart, function(element, index, list) {
				startTimeDay = Moment(element.date + ' ' + element.startTime, 'DD-MM-YYYY HH:mm');
				officialStartTime = Moment(element.date + ' ' + Config.timesheet.startTime, 'DD-MM-YYYY HH:mm');
				officialStartTime.subtract(startTimeDay);

				hours = officialStartTime.hours();

				minutes = officialStartTime.minutes();
				if (minutes < 21)
					minutes = 0;
				else if (minutes < 41)
					minutes = 30;
				else
					minutes = 60;

				totalExtraTimeBeforeStart.add('hours', hours);
				totalExtraTimeBeforeStart.add('minutes', minutes);
			});

			// console.log(totalExtraTimeBeforeStart.hours());
			// console.log(totalExtraTimeBeforeStart.minutes());

			// Extra time after end
			var configEndTime = Moment(Config.timesheet.endTime, 'HH:mm');
			var modelEnd;
			var daysWithExtraTimeAfterEnd = _.filter(this.collection.toJSON(), function(model) {
				modelEnd = Moment(model.endTime, 'HH:mm');
				return Moment(modelEnd).isAfter(configEndTime);
			});

			var endTimeDay;
			var officialEndTime;
			var totalExtraTimeAfterEnd = Moment('00:00', 'HH:mm');
			_.forEach(daysWithExtraTimeAfterEnd, function(element, index, list) {
				endTimeDay = Moment(element.date + ' ' + element.endTime, 'DD-MM-YYYY HH:mm');
				officialEndTime = Moment(element.date + ' ' + Config.timesheet.endTime, 'DD-MM-YYYY HH:mm');
				endTimeDay.subtract(officialEndTime);

				hours = endTimeDay.hours();

				minutes = endTimeDay.minutes();
				if (minutes < 21)
					minutes = 0;
				else if (minutes < 41)
					minutes = 30;
				else
					minutes = 60;

				totalExtraTimeAfterEnd.add('hours', hours);
				totalExtraTimeAfterEnd.add('minutes', minutes);
			});
			// console.log(totalExtraTimeAfterEnd.hours());
			// console.log(totalExtraTimeAfterEnd.minutes());

			// Finally, the total of extra time!
			var totalMinutes = Moment('00:00', 'HH:mm');
			totalMinutes.add(totalExtraTimeBeforeStart.minutes(), 'minutes');
			totalMinutes.add(totalExtraTimeAfterEnd.minutes(), 'minutes');
			var totalExtraTime = totalExtraTimeBeforeStart.hours() + totalExtraTimeAfterEnd.hours() + totalMinutes.hours();

			attrToView.totalExtraTime = totalExtraTime + ':' + totalMinutes.minutes();

			// // Total Leaving Early
			// var daysWithLeavingEarly = _.filter(this.collection.toJSON(), function(model) {
			// 	// TODO implement leaving early
			// 	// if total hours worked <= workload then must discount those hours!
			// 	return true;
			// });
			// var totalTimeLeavingEarly;
			// _.forEach(daysWithLeavingEarly, function(element, index, list) {
			// 	console.log(element);
			// 	console.log(index);
			// 	console.log(list);

			// 	// TODO implement it!
			// });

			// // Balance
			// var balance = totalExtraTime - totalTimeLeavingEarly;

			// // Status
			// // TODO implement it!
			// // until 8 days late to work and less than 45 minutes total minutes after: good else: bad

			// TODO filter by month
			attrToView.selectMonth = [
				{label: 'January', value: 0}
				, {label: 'February', value: 1}
				, {label: 'March', value: 2}
				, {label: 'April', value: 3}
				, {label: 'May', value: 4}
				, {label: 'June', value: 5}
				, {label: 'July', value: 6}
				, {label: 'August', value: 7}
				, {label: 'September', value: 8}
				, {label: 'October', value: 9}
				, {label: 'November', value: 10}
				, {label: 'December', value: 11}
			];

			return attrToView;
		}

	});

	return CompositeView;
});
