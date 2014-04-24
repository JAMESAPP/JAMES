define([
	'marionette'
	, 'app'
	, 'text!../../templates/gym.tpl'
], function (Marionette, App, Template)  {
	var ItemView = Marionette.ItemView.extend({
		template: Template,
		tagName: 'div',
		className: 'box'
	});

	return ItemView;
});
