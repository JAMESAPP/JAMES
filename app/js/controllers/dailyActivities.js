define([
	'underscore'
	, 'backbone'
	, 'app'
	, 'views/expense/register'
	, 'views/expense/list'
	, 'views/food'
	, 'views/motorcycle'
	, 'views/gym'
	, 'views/timesheet'
	, 'models/expense'
], function (_, Backbone, App, ExpenseRegisterView, ExpensesListView, FoodView, MotorcycleView, GymView, TimesheetView, ExpenseModel) {
	var DailyActivitiesController = Backbone.Router.extend({
		routes: {
			'expenses': 'expenses',
			'expense/new': 'expense',
			'expense/:id': 'expense',

			'food': 'food',

			'motorcycle': 'motorcycle',

			'gym': 'gym',

			'timesheet': 'timesheet'
		},

		expenses: function() {
			var expenses = [];
			App.indexedDB.db.transaction(['expenses'], 'readonly').objectStore('expenses').openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					expenses.push(cursor.value);
					cursor.continue();
				} else {
					App.mainRegion.show(new ExpensesListView(expenses));
				}
			};
		},
		expense: function(id) {
			// FIXME after first time, var App.indexedDB.db is equal to null. Why?

			// console.log(App.indexedDB);
			// console.log(App.indexedDB.db);
			// if (App.indexedDB.db() == null) {
			// 	console.log('App.indexedDB.db is null');
			// 	App.initializeDB();
			// }

			var objectStore = App.indexedDB.db.transaction(['expenses']).objectStore('expenses').get(id != undefined ? parseInt(id) : 0);
			objectStore.onsuccess = function(event) {
				var expense = new ExpenseModel(event.target.result);
				App.mainRegion.show(new ExpenseRegisterView(expense));
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
