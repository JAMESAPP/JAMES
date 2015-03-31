define([
	'marionette'
	, 'app'
], function (Marionette, App)  {
	var ItemView = Marionette.ItemView.extend({
		template: 'app/templates/about.tpl',
		tagName: 'div',
		className: 'box'
	});

	return ItemView;
});
