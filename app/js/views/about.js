define([
	'marionette'
	, 'app'
	, 'text!../../templates/about.tpl'
], function (Marionette, App, Template)  {
	var ItemView = Marionette.ItemView.extend({
		// template: Template,
		template: 'app/templates/about.tpl',
		tagName: 'div',
		className: 'box'
	});

	return ItemView;
});
