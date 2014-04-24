define([
	'marionette'
	, 'app'
	, 'text!../../templates/motorcycle.tpl'
], function (Marionette, App, Template)  {
	var ItemView = Marionette.ItemView.extend({
		template: Template,
		tagName: 'div',
		className: 'box'
	});

	return ItemView;
});
