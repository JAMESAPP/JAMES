define([
		'marionette'
		, 'app'
		, 'text!../../templates/footer.tpl'
], function (Marionette, App, Template){
		var ItemView = Marionette.ItemView.extend({
				template: Template,
				tagName: 'div',
				className: 'navbar navbar-inverse footer'
		});

		return ItemView;
});
