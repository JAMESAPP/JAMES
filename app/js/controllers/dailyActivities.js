define([
	'backbone'
	, 'app'
	, 'collections/generic'
	, 'views/expense/register'
	, 'views/expense/list'
	, 'views/food/register'
	, 'views/food/list'
	, 'views/motorcycle/register'
	, 'views/motorcycle/list'
	, 'views/gym/register'
	, 'views/gym/list'
	, 'views/timesheet/register'
	, 'views/timesheet/list'
	, 'views/backup'
	, 'models/expense'
	, 'models/food'
	, 'models/motorcycle'
	, 'models/gym'
	, 'models/timesheet'
], function (Backbone, App, Collection, ExpenseRegisterView, ExpensesListView, FoodRegisterView, FoodsListView, MotorcycleRegisterView, MotorcyclesListView, GymRegisterView, GymsListView, TimesheetRegisterView, TimesheetsListView, BackupView, ExpenseModel, FoodModel, MotorcycleModel, GymModel, TimesheetModel) {
	var DailyActivitiesController = Backbone.Router.extend({
		routes: {
			'expenses': 'expenses',
			'expense/new': 'expense',
			'expense/:id': 'expense',

			'foods': 'foods',
			'food/new': 'food',
			'food/:id': 'food',

			'motorcycles': 'motorcycles',
			'motorcycle/new': 'motorcycle',
			'motorcycle/:id': 'motorcycle',

			'gyms': 'gyms',
			'gym/new': 'gym',
			'gym/:id': 'gym',

			'timesheets': 'timesheets',
			'timesheet/new': 'timesheet',
			'timesheet/:id': 'timesheet'

			, 'backup': 'backup'
		},

		expenses: function() {
			this.list('expenses', ExpensesListView);
		},
		expense: function(id) {
			this.register(id, 'expenses', ExpenseModel, ExpenseRegisterView);
		},

		foods: function() {
			this.list('foods', FoodsListView);
		},
		food: function(id) {
			this.register(id, 'foods', FoodModel, FoodRegisterView);
		},

		motorcycles: function() {
			this.list('motorcycles', MotorcyclesListView);
		},
		motorcycle: function(id) {
			this.register(id, 'motorcycles', MotorcycleModel, MotorcycleRegisterView);
		},

		gyms: function() {
			this.list('gyms', GymsListView);
		},
		gym: function(id) {
			this.register(id, 'gyms', GymModel, GymRegisterView);
		},

		timesheets: function() {
			this.list('timesheets', TimesheetsListView);
		},
		timesheet: function(id) {
			this.register(id, 'timesheets', TimesheetModel, TimesheetRegisterView);
		},

		/*
		 * First, I have to say sorry for your eyes. I know, this code bellow is ugly...
		 * But, in my defense, I blame the indexedDB API.
		 * Why? Because I can't use the synchronous API yet! So, just left me this option bellow...
		 * If you know a way better to get all data without this workaround, drop me a line: foguinho.peruca@gmail.com
		 *
		 */
		backup: function() {
// 			var transaction = App.indexedDB.db.transaction(['timesheets', 'expenses', 'foods', 'groceries', 'gyms', 'motorcycles', 'timesheets', 'configurations'], 'readonly');

// 			var expenses = [], expenseStore = transaction.objectStore('expenses').openCursor(),
// 				foods = [], foodStore = transaction.objectStore('foods').openCursor(),
// 				groceries = [], groceryStore = transaction.objectStore('groceries').openCursor(),
// 				gyms = [], gymStore = transaction.objectStore('gyms').openCursor(),
// 				motorcycles = [], motorcycleStore = transaction.objectStore('motorcycles').openCursor(),
// 				timesheets = [], timesheetStore = transaction.objectStore('timesheets').openCursor(),
// 				configurations = [], configurationsStore = transaction.objectStore('configurations').openCursor()
// 			;			

// 			expenseStore.onsuccess = function(e) {
// 				var cursor = e.target.result;
// 				if (cursor) {
// 					expenses.push(cursor.value);
// 					cursor.continue();
// 				} else {
// console.log('start food');
// 					foodStore.onsuccess = function(e) {
// 						var cursor = e.target.result;
// 						if (cursor) {
// 							foods.push(cursor.value);
// 							cursor.continue();
// 						} else {
// console.log('start grocery');
// 							groceryStore.onsuccess = function(e) {
// 								var cursor = e.target.result;
// 								if (cursor) {
// 									groceries.push(cursor.value);
// 									cursor.continue();
// 								} else {
// console.log('start gym');
// 									gymStore.onsuccess = function(e) {
// 										var cursor = e.target.result;
// 										if (cursor) {
// 											gyms.push(cursor.value);
// 											cursor.continue();
// 										} else {
// console.log('start motorcycle');
// 											motorcycleStore.onsuccess = function(e) {
// 												var cursor = e.target.result;
// 												if (cursor) {
// 													motorcycles.push(cursor.value);
// 													cursor.continue();
// 												} else {
// console.log('start timesheet');
// 													timesheetStore.onsuccess = function(e) {
// 														var cursor = e.target.result;
// 														if (cursor) {
// 															timesheets.push(cursor.value);
// 															cursor.continue();
// 														} else {
// console.log('start configuration');
// 															configurationsStore.onsuccess = function(e) {
// 																var cursor = e.target.result;
// console.log(cursor);
// 																if (cursor) {
// 																	configurations.push(cursor.value);
// console.log('inside cursor conf');
// 																	cursor.continue();
// 																} else {
// console.log('now need show backup view');
// 																	App.mainRegion.show(new BackupView(expenses, foods,	groceries, gyms, motorcycles, timesheets, configurations));
// 																}
// 															};
// 														}
// 													};
// 												}
// 											};
// 										}
// 									};
// 								}
// 							};
// 						}
// 					};
// 				}
// 			};

			App.mainRegion.show(new BackupView());
		},

		list: function(entity, View) {
			var entities = [];
			App.indexedDB.db.transaction([entity], 'readonly').objectStore(entity).openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					entities.push(cursor.value);
					cursor.continue();
				} else {
					var collection = new Collection(entities);
					App.mainRegion.show(new View(collection));
				}
			};
		},
		register: function(id, entity, Model, RegisterView) {
			// FIXME after first time, var App.indexedDB.db is equal to null. Why?
			// console.log(App.indexedDB);
			// console.log(App.indexedDB.db);
			// if (App.indexedDB.db() == null) {
			// 	console.log('App.indexedDB.db is null');
			// 	App.initializeDB();
			// }

			var objectStore = App.indexedDB.db.transaction([entity]).objectStore(entity).get(id != undefined ? parseInt(id) : 0);
			objectStore.onsuccess = function(event) {
				var model = new Model(event.target.result);
				App.mainRegion.show(new RegisterView(model));
			};
		}
	});

	return DailyActivitiesController;
});
