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

			// Total Leaving Early
			var leavingEarly;
			var daysWithLeavingEarly = _.filter(this.collection.toJSON(), function(model) {
				// TODO if total hours worked <= workload then must discount those hours!
				leavingEarly = Moment(model.date + ' ' + model.leavingEarly, 'DD-MM-YYYY HH:mm');

				return leavingEarly.hours() > 0 || leavingEarly.minutes() > 0;
			});
			var totalTimeLeavingEarly = Moment.duration(0, 'hours');
			_.forEach(daysWithLeavingEarly, function(element, index, list) {
				leavingEarly = Moment(element.date + ' ' + element.leavingEarly, 'DD-MM-YYYY HH:mm');

				totalTimeLeavingEarly.add(leavingEarly.hours(), 'hours');
				totalTimeLeavingEarly.add(leavingEarly.minutes(), 'minutes');
			});
			attrToView.totalLeavingEarly = totalTimeLeavingEarly.hours() + ':' + totalTimeLeavingEarly.minutes();

			// // Balance
			// // TODO implment it!
			// attrToView.balance = totalExtraTime.subtract(totalTimeLeavingEarly);

			// // Status
			attrToView.status = 'success';

			if (later.length > 8 || totalMinutesLaterAfterStart.minutes() > 45)
				attrToView.status = 'important';

			if (later.length > 0 && totalMinutesLaterAfterStart.minutes() <= 45)
				attrToView.status = 'warning';

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
