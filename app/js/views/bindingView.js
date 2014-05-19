define([
	'epoxy'
	, 'backbone'
], function (Epoxy, Backbone){
	var BindingView = Backbone.Epoxy.View.extend({
		bindingHandlers: {
			objectHandler: {
				get: function($element, value, event) {
					var property = event.currentTarget.getAttribute('data-bind').split(',')[0].split(':')[1];
					var obj = {};
					obj[property] = {id: parseInt($element.val())};
					return obj;
				}
			}
		}
	});

	return BindingView;
});
