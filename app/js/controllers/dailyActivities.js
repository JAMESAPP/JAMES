define([
	'underscore'
	, 'backbone'
	, 'app'
	, 'views/expenses'
	, 'views/food'
	, 'views/motorcycle'
	, 'views/gym'
	, 'views/timesheet'
	, 'models/expense'
], function (_, Backbone, App, ExpensesView, FoodView, MotorcycleView, GymView, TimesheetView, ExpenseModel) {
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
			// FIXME after first time, var App.indexedDB.db is equal to null. Why?
			var objectStore = App.indexedDB.db.transaction(['expenses']).objectStore('expenses').get(id != undefined ? parseInt(id) : 0);
			objectStore.onsuccess = function(event) {
				var expense = new ExpenseModel(event.target.result);
				App.mainRegion.show(new ExpensesView(expense));
			};
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
