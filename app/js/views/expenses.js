define([
	'marionette'
	, 'app'
	, 'views/register'
	, 'text!../../templates/expenses.tpl'
], function (Marionette, App, RegisterView, Template) {
	var ItemView = RegisterView.extend({
		template: Template
		, objectStore: 'expenses'
		, onRender: function() {
			// TODO implement custom validation for form (date, ammount, category).
			// this.$el.find('#inputDate').datepicker('option', 'yearRange', App.getConfig().datePickerConf.yearRange);
		}
	});

	return ItemView;
});
