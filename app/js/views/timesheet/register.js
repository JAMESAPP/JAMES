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
			endTime.subtract(startTime);

			var durationWorkDay = Moment.duration({minutes: endTime.minutes(), hours: endTime.hours()});
			var workload = Moment.duration(Config.timesheet.workload);
			durationWorkDay.subtract(workload);

			if (durationWorkDay._milliseconds > 0) {
				this.$el.find('#inputLeavingEarly').val('00:00');
				this.$el.find('#txtLeavingEarlyMotive').fadeOut();
			} else {
				this.$el.find('#inputLeavingEarly').val(durationWorkDay.hours().toString().replace('-', '') + ':' + durationWorkDay.minutes().toString().replace('-', ''));
				this.$el.find('#txtLeavingEarlyMotive').fadeIn();

				// self.$el.find('#spanMessage').html('Ow boy! We got a error.. <strong>' + e.srcElement.error.message + '</strong>').fadeIn().delay(5000).fadeOut();
			}

			this.model.set('leavingEarly', this.$el.find('#inputLeavingEarly').val());
console.log(this.model.attributes);
		}
	});

	return ItemView;
});
