define([
	'backbone'
	, 'app'
	, 'views/expenses'
	, 'views/food'
	, 'views/motorcycle'
	, 'views/gym'
	, 'views/timesheet'
], function (Backbone, App, ExpensesView, FoodView, MotorcycleView, GymView, TimesheetView) {
	var DailyActivitiesController = Backbone.Router.extend({
		routes: {
			'expenses': 'expenses',
			'food': 'food',
			'motorcycle': 'motorcycle',
			'gym': 'gym',
			'timesheet': 'timesheet'
		},

		expenses: function() {
			App.mainRegion.show(new ExpensesView());
		},

		food: function() {
			App.mainRegion.show(new FoodView());
		},

		motorcycle: function() {
			App.mainRegion.show(new MotorcycleView());
		},

		gym: function() {
			App.mainRegion.show(new GymView());
		},

		timesheet: function() {
			App.mainRegion.show(new TimesheetView());
		}
	});

	return DailyActivitiesController;
});
