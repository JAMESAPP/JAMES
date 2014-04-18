define([
		'marionette'
		, 'app'
		, 'text!../../templates/menu.tpl'
], function (Marionette, App, Template){
		var ItemView = Marionette.ItemView.extend({
				template: Template,
				tagName: 'div',
				className: 'navbar navbar-inverse navbar-static-top'
		});

		return ItemView;
});
