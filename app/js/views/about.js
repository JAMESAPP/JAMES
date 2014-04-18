define([
		'marionette'
		, 'app'
		, 'text!../../templates/about.tpl'
], function (Marionette, App, Template)  {
		var ItemView = Marionette.ItemView.extend({
				template: Template,
				tagName: 'div',
				className: 'box'
		});

		return ItemView;
});
