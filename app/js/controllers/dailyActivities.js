define([
	'backbone'
	, 'app'
	, 'views/expenses'
	, 'views/food'
	, 'views/motorcycle'
	, 'views/gym'
	, 'views/timesheet'
	, 'models/expense'
], function (Backbone, App, ExpensesView, FoodView, MotorcycleView, GymView, TimesheetView, ExpenseModel) {
	var DailyActivitiesController = Backbone.Router.extend({
		routes: {
			'expenses': 'expenses',
			'expenses/:id': 'expenses',
			'food': 'food',
			'motorcycle': 'motorcycle',
			'gym': 'gym',
			'timesheet': 'timesheet'
		},

		expenses: function(id) {
			var expense = new ExpenseModel();
			App.mainRegion.show(new ExpensesView(expense));
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
