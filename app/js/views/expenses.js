define([
	'marionette'
	, 'app'
	, 'text!../../templates/expenses.tpl'
], function (Marionette, App, Template)  {
	var ItemView = Marionette.ItemView.extend({
		template: Template,
		tagName: 'div',
		className: 'box'
	});

	return ItemView;
});
