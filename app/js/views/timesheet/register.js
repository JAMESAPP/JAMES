define([
	'marionette'
	, 'underscore'
	, 'moment'
	, 'app'
	, 'config'
	, 'views/register'
	, 'text!../../../templates/timesheet/register.tpl'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, Moment, App, Config, RegisterView, Template) {
	var ItemView = RegisterView.extend({
		template: Template
		, objectStore: 'timesheets'
		, onRender: function() {
			this.$el.find('#inputDate').datepicker(Config.datePickerConf);
			this.$el.find('#inputDate').datepicker('option', 'yearRange', Config.datePickerConf.yearRange);
			this.$el.find('#inputStartTime').mask('##:##');
			this.$el.find('#inputEndTime').mask('##:##');
			this.$el.find('#inputLeavingEarly').mask('##:##');
		}
		, events: function() {
			return _.extend({}, RegisterView.prototype.events, {
				'change .timeMask': 'discountTime'
			});
		}
		, discountTime: function(ev) {
			ev.preventDefault();

			var date = this.$el.find('#inputDate').val();
			var startTime = Moment(date + ' ' + this.$el.find('#inputStartTime').val(), 'DD-MM-YYYY HH:mm');
			var endTime = Moment(date + ' ' + this.$el.find('#inputEndTime').val(), 'DD-MM-YYYY HH:mm');
			var workload = Moment(date + ' ' + Config.timesheet.workload, 'DD-MM-YYYY HH:mm');

			endTime.subtract(startTime);
			console.log(endTime);
			console.log(endTime.hours());
			console.log(endTime.minutes());

			console.log('===================');

			endTime.subtract(workload);
			console.log(endTime);
			console.log(endTime.hours());
			console.log(endTime.minutes());

			// this.$el.find('#inputLeavingEarly').val((/*verify if endTime is negative*/)? '00:00' : endTime.hours() + ':' + endTime.minutes());
			
		}
	});

	return ItemView;
});
