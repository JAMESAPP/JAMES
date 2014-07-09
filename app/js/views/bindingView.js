define([
	'epoxy'
	, 'backbone'
], function (Epoxy, Backbone){
	var BindingView = Backbone.Epoxy.View.extend({
		bindingHandlers: {
			objectHandler: {
				get: function($element, value, event) {
					var member = event.currentTarget.getAttribute('data-bind').split(',')[0].split(':')[1];
					var obj = {};
					var property = member.split('.')[1];
					obj[property] = {id: parseInt($element.val())};

					return obj;
				}
			}
			, timesheetHandler: {
				get: function($element, value, event) {
					var timesheet;
					var property = event.currentTarget.getAttribute('data-bind').split(',')[0].split(':')[1].split('.')[1];
					timesheet[property] = value;
console.log(timesheet);
					return timesheet;
				}
			}
		}
	});

	return BindingView;
});
