define([
	'underscore'
	, 'backbone'
	, 'app'
	, 'collections/expenses'
	, 'collections/timesheets'
	, 'views/expense/register'
	, 'views/expense/list'
	, 'views/food'
	, 'views/motorcycle'
	, 'views/gym'
	, 'views/timesheet/register'
	, 'views/timesheet/list'
	, 'models/expense'
	, 'models/timesheet'
], function (_, Backbone, App, ExpenseCollection, TimesheetCollection, ExpenseRegisterView, ExpensesListView, FoodView, MotorcycleRegisterView, GymView, TimesheetRegisterView, TimesheetsListView, ExpenseModel, TimesheetModel) {
	var DailyActivitiesController = Backbone.Router.extend({
		routes: {
			'expenses': 'expenses',
			'expense/new': 'expense',
			'expense/:id': 'expense',

			'food': 'food',

			'motorcycles': 'motorcycles',
			'motorcycle/new': 'motorcycle',
			'motorcycle/:id': 'motorcycle',

			'gym': 'gym',

			'timesheets': 'timesheets',
			'timesheet/new': 'timesheet',
			'timesheet/:id': 'timesheet'
		},

		expenses: function() {
			var expenses = [];
			App.indexedDB.db.transaction(['expenses'], 'readonly').objectStore('expenses').openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					expenses.push(cursor.value);
					cursor.continue();
				} else {
					var expensesCollection = new ExpenseCollection(expenses);
					App.mainRegion.show(new ExpensesListView(expensesCollection));
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

			// TODO think about inheritance for instantiate views
			var objectStore = App.indexedDB.db.transaction(['expenses']).objectStore('expenses').get(id != undefined ? parseInt(id) : 0);
			objectStore.onsuccess = function(event) {
				var expense = new ExpenseModel(event.target.result);
				App.mainRegion.show(new ExpenseRegisterView(expense));
			};
		},

		food: function() {
			App.mainRegion.show(new FoodView());
		},

		// TODO implement generic list and register in controller.
		motorcycles: function() {
			var motorcycle = [];
			App.indexedDB.db.transaction(['motorcycles'], 'readonly').objectStore('motorcycles').openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					motorcycle.push(cursor.value);
					cursor.continue();
				} else {
					var collection = new Collection(motorcycle);
					App.mainRegion.show(new MotorcyclesListView(collection));
				}
			};
		},
		motorcycle: function(id) {
			App.mainRegion.show(new MotorcycleRegisterView());
			var objectStore = App.indexedDB.db.transaction(['motorcycles']).objectStore('motorcycles').get(id != undefined ? parseInt(id) : 0);
			objectStore.onsuccess = function(event) {
				var motorcycle = new MotorcycleModel(event.target.result);
				App.mainRegion.show(new MotorcycleRegisterView(motorcycle));
			};
		},

		gym: function() {
			App.mainRegion.show(new GymView());
		},

		timesheets: function() {
			var timesheets = [];
			App.indexedDB.db.transaction(['timesheets'], 'readonly').objectStore('timesheets').openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					timesheets.push(cursor.value);
					cursor.continue();
				} else {
					var timesheetsCollection = new TimesheetCollection(timesheets);
					App.mainRegion.show(new TimesheetsListView(timesheetsCollection));
				}
			};
		},

		timesheet: function(id) {
			var objectStore = App.indexedDB.db.transaction(['timesheets']).objectStore('timesheets').get(id != undefined ? parseInt(id) : 0);
			objectStore.onsuccess = function(event) {
				var timesheet = new TimesheetModel(event.target.result);
				App.mainRegion.show(new TimesheetRegisterView(timesheet));
			};
		}
	});

	return DailyActivitiesController;
});
