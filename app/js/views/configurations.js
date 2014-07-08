define([
	'marionette'
	, 'app'
	, 'views/bindingView'
	, 'views/register'
	, 'text!../../templates/configurations.tpl'
], function (Marionette, App, BidingView, RegisterView, Template) {
	var ItemView = RegisterView.extend({
		tagName: 'div',
		className: 'box'
		, template: Template
		, objectStore: 'configurations'

		, onRender: function() {
			console.log(this.model.attributes);
		}
	});

	return ItemView;
});
