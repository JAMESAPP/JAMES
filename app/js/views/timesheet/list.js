define([
	'underscore',
	'marionette',
	'moment',
	'config',
	'models/expense',
	'views/list',
	'text!../../../templates/timesheet/list.tpl',
	'text!../../../templates/timesheet/list-item.tpl'
], function (_, Marionette, Moment, Config, ExpenseModel, ListView, CompositeViewTemplate, ItemViewTemplate) {
	var itemView = Marionette.ItemView.extend({
		template: ItemViewTemplate,
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: CompositeViewTemplate,
		itemView: itemView,
		objectStore: 'timesheets'
		, serializeData: function() {
			var attrToView = _.clone(this.attributes) || {},
				modelStart,
				configStartTime = Moment(Config.timesheet.startTime, 'HH:mm'),
				configEndTime = Moment(Config.timesheet.endTime, 'HH:mm')
			;

			// Total Days Late to Work
			var daysLateToWork = this.daysLateToWork(this.collection.toJSON(), configStartTime);
			attrToView.totalDaysLateToWork = daysLateToWork.length;

			// Total Minutes After Start
			var totalMinutesLaterAfterStart = this.totalMinutesLaterAfterStart(daysLateToWork, configStartTime);
			attrToView.totalMinutesLaterAfterStart = totalMinutesLaterAfterStart;

			// Total Extra Time
			// , totalExtraTime: function(timesheets, configStartTime, configEndTime) {
			attrToView.totalExtraTime = this.totalExtraTime(this.collection.toJSON(), configStartTime, configEndTime);

			// Total Leaving Early
			attrToView.totalLeavingEarly = this.totalTimeLeavingEarly(this.collection.toJSON());

			// Balance
			attrToView.balance = this.balance(Moment.duration(attrToView.totalExtraTime), Moment.duration(attrToView.totalLeavingEarly));

			// Status
			attrToView.status = this.status(daysLateToWork, totalMinutesLaterAfterStart);

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
		, daysLateToWork: function(timesheets, configStartTime) {
			var checkin;
			var later = _.filter(timesheets, function(timesheet) {
				checkin = Moment(timesheet.startTime, 'HH:mm');
				return Moment(checkin).isAfter(configStartTime);
			});

			return later;
		}
		, totalMinutesLaterAfterStart: function(later, configStartTime) {
			var totalMinutesLateByDay;
			var totalMinutesLaterAfterStart = Moment('00:00', 'HH:mm');
			_.forEach(later, function(element, index, list) {
				totalMinutesLateByDay = Moment(element.startTime, 'HH:mm');
				totalMinutesLateByDay.subtract(configStartTime);
				totalMinutesLaterAfterStart.add(totalMinutesLateByDay);
			});
			return totalMinutesLaterAfterStart.minutes();
		}
		, totalExtraTime: function(timesheets, configStartTime, configEndTime) {
			var hours,
				minutes,
				checkin,
				startTimeDay,
				officialStartTime,

				checkout,
				endTimeDay,
				officialEndTime
			;

			// Extra time before start
			var totalExtraTimeBeforeStart = Moment('00:00', 'HH:mm');
			var daysWithExtraTimeBeforeStart = _.filter(timesheets, function(timesheet) {
				checkin = Moment(timesheet.startTime, 'HH:mm');
				return Moment(checkin).isBefore(configStartTime);
			});

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

			// Extra time after end
			var daysWithExtraTimeAfterEnd = _.filter(timesheets, function(timesheet) {
				checkout = Moment(timesheet.endTime, 'HH:mm');
				return Moment(checkout).isAfter(configEndTime);
			});
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

			// Finally, the total of extra time!
			var totalMinutes = Moment('00:00', 'HH:mm');
			totalMinutes.add(totalExtraTimeBeforeStart.minutes(), 'minutes');
			totalMinutes.add(totalExtraTimeAfterEnd.minutes(), 'minutes');
			var totalExtraTime = totalExtraTimeBeforeStart.hours() + totalExtraTimeAfterEnd.hours() + totalMinutes.hours();

			return totalExtraTime + ':' + totalMinutes.minutes();
		}
		// TODO if total hours worked <= workload then must discount those hours!
		, totalTimeLeavingEarly: function(timesheets) {
			var leavingEarly,
				daysWithLeavingEarly = _.filter(timesheets, function(timesheet) {
				leavingEarly = Moment(timesheet.date + ' ' + timesheet.leavingEarly, 'DD-MM-YYYY HH:mm');

				return leavingEarly.hours() > 0 || leavingEarly.minutes() > 0;
			});
			var totalTimeLeavingEarly = Moment.duration(0, 'hours');
			_.forEach(daysWithLeavingEarly, function(element, index, list) {
				leavingEarly = Moment(element.date + ' ' + element.leavingEarly, 'DD-MM-YYYY HH:mm');

				totalTimeLeavingEarly.add(leavingEarly.hours(), 'hours');
				totalTimeLeavingEarly.add(leavingEarly.minutes(), 'minutes');
			});

			return totalTimeLeavingEarly.hours() + ':' + totalTimeLeavingEarly.minutes();
		}
		, balance: function(totalExtraTime, totalLeavingEarly) {
			totalExtraTime.subtract(totalLeavingEarly);
			return totalExtraTime.hours() + ':' + totalExtraTime.minutes();
		}
		, status: function(daysLateToWork, totalMinutesLaterAfterStart) {
			var status = 'success';

			if (daysLateToWork.length > 8 || totalMinutesLaterAfterStart > 45)
				status = 'important';

			if (daysLateToWork.length > 0 && totalMinutesLaterAfterStart <= 45)
				status = 'warning';

			return status;
		}
	});

	return CompositeView;
});
