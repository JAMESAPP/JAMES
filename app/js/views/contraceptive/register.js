define([
	'marionette'
	, 'views/register'
	, 'models/setting'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, RegisterView, SettingModel) {
	var ItemView = RegisterView.extend({
		template: 'app/templates/contraceptive/register.tpl'
		, objectStore: 'contraceptives'
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
				self.$el.find('#inputCycle').mask('##/####');
			});
		}
	});

	return ItemView;
});
