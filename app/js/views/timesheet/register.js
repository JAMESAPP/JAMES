define([
	'marionette'
	, 'underscore'
	, 'moment'
	, 'app'
	, 'collections/machines'
	, 'views/register'
	, 'models/setting'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, Moment, App, MachinesCollection, RegisterView, SettingModel) {
	var ItemView = RegisterView.extend({
		template: 'app/templates/timesheet/register.tpl'
		, objectStore: 'timesheets'
		, onRender: function() {
			var self = this,
				setting = new SettingModel(),
				conf = setting.defaults()
			;
			setting.getInfo(function(event) {
				if (event.target.result != undefined)
					conf = event.target.result;

				self.$el.find('#inputDate').datepicker(conf.datePickerConf);
				self.$el.find('#inputDate').datepicker('option', 'yearRange', conf.datePickerConf.yearRange);
				self.$el.find('#inputStartTime').mask('##:##');
				self.$el.find('#inputEndTime').mask('##:##');
				self.$el.find('#inputLeavingEarly').mask('##:##');
			});
		}
		, serializeData: function() {
			var attrToView = _.clone(this.attributes) || {};

			var machinesCollection = new MachinesCollection();
			machinesCollection.fetch({async: false});

			attrToView.selectStartTimeMachine = machinesCollection.toJSON();
			var top = _.filter(machinesCollection.toJSON(), function(machine){
				return machine.value == attrToView.startTimeMachine;
			});
			if (attrToView.startTimeMachine != undefined)
				attrToView.selectStartTimeMachine.unshift(top[0]);

			attrToView.selectEndTimeMachine = machinesCollection.toJSON();
			top = _.filter(machinesCollection.toJSON(), function(machine){
				return machine.value == attrToView.endTimeMachine;
			});
			if (attrToView.endTimeMachine != undefined)
				attrToView.selectEndTimeMachine.unshift(top[0]);

			// TODO implement filter for repeated element in combo

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

			var self = this,
				setting = new SettingModel(),
				conf = setting.defaults()
			;
			setting.getInfo(function(event) {
				if (event.target.result != undefined)
					conf = event.target.result;

				var date = self.$el.find('#inputDate').val();
				var startTime = Moment(date + ' ' + self.$el.find('#inputStartTime').val(), 'DD-MM-YYYY HH:mm');
				var endTime = Moment(date + ' ' + self.$el.find('#inputEndTime').val(), 'DD-MM-YYYY HH:mm');
				endTime.subtract(startTime);

				var durationWorkDay = Moment.duration({minutes: endTime.minutes(), hours: endTime.hours()});
				var workload = Moment.duration(conf.timesheet.workload);
				durationWorkDay.subtract(workload);

				if (durationWorkDay._milliseconds > 0) {
					self.$el.find('#inputLeavingEarly').val('00:00');
					self.$el.find('#divLeavingEarlyMotive').fadeOut();
				} else {
					self.$el.find('#inputLeavingEarly').val(durationWorkDay.hours().toString().replace('-', '') + ':' + durationWorkDay.minutes().toString().replace('-', ''));
					self.$el.find('#divLeavingEarlyMotive').fadeIn();
				}

				self.model.set('leavingEarly', self.$el.find('#inputLeavingEarly').val());
			});
		}
		, discountAllDay: function(ev) {
			var self = this,
				setting = new SettingModel(),
				conf = setting.defaults()
			;
			setting.getInfo(function(event) {
				if (event.target.result != undefined)
					conf = event.target.result;

				if (self.$el.find('#inputDiscountAllDay').is(':checked')) {
					self.$el.find('#divStartEndDay').fadeOut();

					self.model.set('startTime', null);
					self.model.set('startTimeMotive', null);
					self.model.set('endTime', null);
					self.model.set('endTimeMotive', null);

					self.$el.find('#inputLeavingEarly').val(conf.timesheet.workload);
					self.model.set('leavingEarly', self.$el.find('#inputLeavingEarly').val());
				} else {
					self.$el.find('#divStartEndDay').fadeIn();
					self.$el.find('#inputLeavingEarly').val('00:00');
					self.model.set('leavingEarly', self.$el.find('#inputLeavingEarly').val());
				}
			});
		}
	});

	return ItemView;
});
