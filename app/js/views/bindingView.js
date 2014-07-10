define([
	'epoxy'
	, 'backbone'
], function (Epoxy, Backbone){
	var BindingView = Backbone.Epoxy.View.extend({
		bindingHandlers: {
			objectHandler: {
				set: function($element, value) {
					$element.val(value[$element.attr('data-property')]);
				},
				get: function($element, value, event) {
					var obj = value,
						result = {},
						property = event.currentTarget.getAttribute('data-property'),
						container = event.currentTarget.getAttribute('data-bind').split(',')[0].split(':')[1]
					;

					obj[property] = $element.val();
					result[container] = obj;

					return result;
				}
			}
		}
	});

	return BindingView;
});
