define([
	'marionette'
	, 'app'
	, 'text!../../templates/menu.tpl'
], function (Marionette, App, Template){
	var ItemView = Marionette.ItemView.extend({
		// template: Template,
		template: 'app/templates/menu.tpl',
		tagName: 'div',
		className: 'navbar navbar-inverse navbar-static-top'
	});

	return ItemView;
});
