define([
	'marionette'
	, 'app'
], function (Marionette, App){
	var ItemView = Marionette.ItemView.extend({
		template: 'app/templates/menu.tpl',
		tagName: 'div'
	});

	return ItemView;
});
