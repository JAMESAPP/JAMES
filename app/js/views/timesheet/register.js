define([
	'marionette'
	, 'underscore'
	, 'moment'
	, 'app'
	, 'config'
	, 'collections/machines'
	, 'views/register'
	, 'text!../../../templates/timesheet/register.tpl'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, Moment, App, Config, MachinesCollection, RegisterView, Template) {
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
		, serializeData: function() {
			var attrToView = _.clone(this.attributes) || {};

			var machinesCollection = new MachinesCollection();
			machinesCollection.fetch({async: false});

			attrToView.selectStartTimeMachine = machinesCollection.toJSON();
			// TODO implement add actual startTimeMachine to top of array!
			// attrToView.selectStartTimeMachine.unshift(attrToView.startTimeMachine);

			attrToView.selectEndTimeMachine = machinesCollection.toJSON();
			// TODO implement add actual endTimeMachine to top of array!
			// attrToView.selectEndTimeMachine.unshift(attrToView.endTimeMachine);

			// TODO implement for edit
			// console.log(attrToView);
			// console.log(attrToView.selectStartTimeMachine);
			// console.log(attrToView.selectEndTimeMachine);

			return attrToView;
		}
		, events: function() {
			return _.extend({}, RegisterView.prototype.events, {
				'change .timeMask': 'discountTime'
				, 'click #inputDiscountAllDay': 'discountAllDay'
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
				this.$el.find('#divLeavingEarlyMotive').fadeOut();
			} else {
				this.$el.find('#inputLeavingEarly').val(durationWorkDay.hours().toString().replace('-', '') + ':' + durationWorkDay.minutes().toString().replace('-', ''));
				this.$el.find('#divLeavingEarlyMotive').fadeIn();
			}

			this.model.set('leavingEarly', this.$el.find('#inputLeavingEarly').val());
		}
		, discountAllDay: function(ev) {
			if (this.$el.find('#inputDiscountAllDay').is(':checked')) {
				this.$el.find('#divStartEndDay').fadeOut();

				this.model.set('startTime', null);
				this.model.set('startTimeMotive', null);
				this.model.set('endTime', null);
				this.model.set('endTimeMotive', null);

				this.$el.find('#inputLeavingEarly').val(Config.timesheet.workload);
				this.model.set('leavingEarly', this.$el.find('#inputLeavingEarly').val());
				this.$el.find('#txtLeavingEarlyMotive').val('Discounted all day.');
				this.model.set('leavingEarlymotive', this.$el.find('#inputLeavingEarly').val());
			} else {
				this.$el.find('#divStartEndDay').fadeIn();
				this.$el.find('#inputLeavingEarly').val('00:00');
				this.model.set('leavingEarly', this.$el.find('#inputLeavingEarly').val());
				this.$el.find('#txtLeavingEarlyMotive').val('');
				this.model.set('leavingEarlymotive', this.$el.find('#inputLeavingEarly').val());
			}
		}
	});

	return ItemView;
});
