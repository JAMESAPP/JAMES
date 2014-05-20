define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'config'
	, 'views/register'
	, 'text!../../templates/expenses.tpl'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, Config, RegisterView, Template) {
	var ItemView = RegisterView.extend({
		template: Template
		, objectStore: 'expenses'

		// , events: function() {                                                                                                       
		// 	return _.extend({}, RegisterView.prototype.events, {
		// 		'focus #inputAmmount' : 'setMask'
		// 	});
		// }

		, onRender: function() {
			// TODO implement custom validation for form (date, ammount, category).
			this.$el.find('#inputDate').datepicker(Config.datePickerConf);
			this.$el.find('#inputDate').datepicker('option', 'yearRange', Config.datePickerConf.yearRange);
			this.$el.find('#inputAmmount').mask('###00,00', {reverse: true});
		}
	});

	return ItemView;
});
