define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'config'
	, 'views/register'
	, 'text!../../../templates/timesheet/register.tpl'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, Config, RegisterView, Template) {
	var ItemView = RegisterView.extend({
		template: Template
		, objectStore: 'timesheets'
		, onRender: function() {
			this.$el.find('#inputDate').datepicker(Config.datePickerConf);
			this.$el.find('#inputDate').datepicker('option', 'yearRange', Config.datePickerConf.yearRange);
			this.$el.find('#inputStartTime').mask('##:##:##');
			this.$el.find('#inputEndTime').mask('##:##:##');
			this.$el.find('#inputLeavingEarly').mask('##:##:##');
		}
	});

	return ItemView;
});
