define([
	'underscore',
	'jquery',
	'marionette',
	'moment',
	'app',
	'james-data',
	'models/expense',
	'views/list',
	'models/setting'
], function (_, $, Marionette, Moment, App, JAMES_DATA, ExpenseModel, ListView, SettingModel) {
	var itemView = Marionette.ItemView.extend({
		template: 'app/templates/timesheet/list-item.tpl',
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: 'app/templates/timesheet/list.tpl',
		itemView: itemView,
		objectStore: 'timesheets'
		, events: function() {
			return _.extend({}, ListView.prototype.events, {
				'click #btnSync': 'sync'
				, 'click .edit-td': 'edit'
			});
		}
		// FIXME retrieve data from setting - in offline storage
		, serializeData: function() {
			var attrToView = _.clone(this.attributes) || {},
				config = new SettingModel().defaults(),
				modelStart,
				configStartTime = Moment(config.timesheet.startTime, 'HH:mm'),
				configEndTime = Moment(config.timesheet.endTime, 'HH:mm')
			;

			// Total Days Late to Work
			var daysLateToWork = this.daysLateToWork(this.collection.toJSON(), configStartTime);
			attrToView.totalDaysLateToWork = daysLateToWork.length;

			// Total Minutes After Start
			var totalMinutesLaterAfterStart = this.totalMinutesLaterAfterStart(daysLateToWork, configStartTime);
			attrToView.totalMinutesLaterAfterStart = totalMinutesLaterAfterStart;

			// Total Extra Time
			attrToView.totalExtraTime = this.totalExtraTime(this.collection.toJSON(), configStartTime, configEndTime, this.model.originalRule);
			attrToView.totalExtraTimeRule30 = this.totalExtraTime(this.collection.toJSON(), configStartTime, configEndTime, this.model.rule30);

			// Total Leaving Early
			attrToView.totalLeavingEarly = this.totalTimeLeavingEarly(this.collection.toJSON());

			// Balance
			attrToView.balance = this.balance(Moment.duration(attrToView.totalExtraTime), Moment.duration(attrToView.totalLeavingEarly));

			// Status
			attrToView.status = this.status(daysLateToWork, totalMinutesLaterAfterStart);

			// TODO filter by month
			attrToView.selectMonth = JAMES_DATA.Parser.getMonths();

			return attrToView;
		}
		, daysLateToWork: function(timesheets, configStartTime) {
			var checkin,
				later = _.filter(timesheets, function(timesheet) {
				if (!timesheet.officialShift)
					return false;

				checkin = Moment(timesheet.startTime, 'HH:mm');
				return Moment(checkin).isAfter(configStartTime);
			});

			return later;
		}
		/**
		 *
		 * Only works with array of late days.
		 *
		 */
		, totalMinutesLaterAfterStart: function(later, configStartTime) {
			var totalMinutesLateByDay;
			var totalMinutesLaterAfterStart = Moment('00:00', 'HH:mm');
			_.forEach(later, function(element, index, list) {
					totalMinutesLateByDay = Moment(element.startTime, 'HH:mm');
					totalMinutesLateByDay.subtract(configStartTime);
					totalMinutesLaterAfterStart.add(totalMinutesLateByDay);
			});
			return totalMinutesLaterAfterStart.hours() + ':' + totalMinutesLaterAfterStart.minutes();
		}
		, totalExtraTime: function(timesheets, configStartTime, configEndTime, rule) {
			var hours,
				minutes,
				checkin,
				startTimeDay,
				officialStartTime,
				config = new SettingModel().defaults(),

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
				officialStartTime = Moment(element.date + ' ' + config.timesheet.startTime, 'DD-MM-YYYY HH:mm');
				officialStartTime.subtract(startTimeDay);

				hours = officialStartTime.hours();

				minutes = rule(officialStartTime.minutes());

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
				officialEndTime = Moment(element.date + ' ' + config.timesheet.endTime, 'DD-MM-YYYY HH:mm');
				endTimeDay.subtract(officialEndTime);

				hours = endTimeDay.hours();

				minutes = rule(endTimeDay.minutes());

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
		/*
		 * Expect that time[0] is >= 0
		 *
		 */
		, status: function(daysLateToWork, totalMinutesLaterAfterStart) {
			var status = 'success',
				time = totalMinutesLaterAfterStart.split(':')
			;

			try {
				if (time[0] < 0)
					throw new Exception('');

				// if (daysLateToWork.length > 8 || totalMinutesLaterAfterStart > 45)
				if (daysLateToWork.length > 8 || parseInt(time[0]) > 0 || (parseInt(time[0]) == 0 && parseInt(time[1]) > 45))
					status = 'danger';

				// if (daysLateToWork.length > 0 && totalMinutesLaterAfterStart <= 45)
				if (daysLateToWork.length > 0 && (parseInt(time[0]) == 0 && parseInt(time[1]) <= 45))
					status = 'warning';

			} catch (Error) {
				console.log(Error);
				console.log('Error with status');
				status = 'default';
			}

			return status;
		}

		, edit: function(ev) {
			ev.preventDefault();

			window.location = '#timesheet/' + ev.currentTarget.getAttribute('id');
		}

		, sync: function(ev) {
			ev.preventDefault();

			console.error('TODO');
		}
	});

	return CompositeView;
});
