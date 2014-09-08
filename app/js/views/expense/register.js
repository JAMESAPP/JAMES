define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'james-data'
	, 'views/register'
	, 'models/setting'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, JAMES_DATA, RegisterView, SettingModel) {
	var ItemView = RegisterView.extend({
		template: 'app/templates/expense/register.tpl'
		, objectStore: 'expenses'
		, serializeData: function() {
			var attrToView = _.clone(this.attributes);

			attrToView.selectCategory = JAMES_DATA.Financial.getChartOfAccounts();
			if (attrToView.id != undefined) {
				attrToView.selectCategory.unshift(attrToView.category);
			}

			return attrToView;
		}
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
				self.$el.find('#inputAmmount').mask('###00,00', {reverse: true});
			});
		}
	});

	return ItemView;
});
