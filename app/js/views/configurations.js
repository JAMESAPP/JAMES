define([
	'underscore'
	, 'marionette'
	, 'app'
	, 'views/bindingView'
	, 'views/register'
	, 'text!../../templates/configurations.tpl'
	, 'hideShowPassword'
], function (_, Marionette, App, BidingView, RegisterView, Template) {
	var ItemView = RegisterView.extend({
		tagName: 'div',
		className: 'box'
		, template: Template
		, objectStore: 'configurations'
		, events: function() {
			return _.extend({}, RegisterView.prototype.events, {
				'click #btnHideShowPassword': 'hideShowPassword'
			});
		}
		, hideShowPassword: function(ev) {
			ev.preventDefault();
			this.$el.find('#inputCloudAuthPassword').togglePassword();
		}
	});

	return ItemView;
});
