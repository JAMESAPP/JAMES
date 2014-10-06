define([
	'backbone'
	, 'app'
	, 'collections/generic'
	, 'views/expense/register'
	, 'views/expense/list'
	, 'views/food/registerFood'
	, 'views/food/listFood'
	, 'views/food/registerMeal'
	, 'views/food/listMeal'
	, 'views/food/painel'
	, 'views/motorcycle/oil/register'
	, 'views/motorcycle/oil/list'
	, 'views/motorcycle/register'
	, 'views/motorcycle/list'
	, 'views/gym/register'
	, 'views/gym/list'
	, 'views/timesheet/register'
	, 'views/timesheet/list'
	, 'views/backup'
	, 'views/settings'
	, 'models/expense'
	, 'models/food/food'
	, 'models/food/meal'
	, 'models/oil'
	, 'models/motorcycle'
	, 'models/gym'
	, 'models/timesheet'
	, 'models/setting'
], function (Backbone, App, Collection, ExpenseRegisterView, ExpensesListView, FoodRegisterView, FoodsListView, MealRegisterView, MealsListView, FoodPainelView, MotorcycleRegisterView, MotorcyclesListView, OilRegisterView, OilsListView, GymRegisterView, GymsListView, TimesheetRegisterView, TimesheetsListView, BackupView, SettingsView, ExpenseModel, FoodModel, MealModel, OilModel, MotorcycleModel, GymModel, TimesheetModel, SettingModel) {
	var DailyActivitiesController = Backbone.Router.extend({
		routes: {
			'expenses': 'expenses',
			'expense/new': 'expense',
			'expense/:id': 'expense',

			'food/painel': 'foodPainel',
			'food/meals': 'meals',
			'food/meal/new': 'meal',
			'food/meal/:id': 'meal',
			'foods': 'foods',
			'food/new': 'food',
			'food/:id': 'food',

			'motorcycles/oil': 'oils',
			'motorcycle/oil/new': 'oil',
			'motorcycle/oil/:id': 'oil',
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

			, 'settings': 'settings'
		},

		expenses: function() {
			this.list('expenses', ExpensesListView);
		},
		expense: function(id) {
			this.register(id, 'expenses', ExpenseModel, ExpenseRegisterView);
		},

		foodPainel: function() {
			App.mainRegion.show(new FoodPainelView());
		},
		foods: function() {
			this.list('foods', FoodsListView);
		},
		food: function(id) {
			this.register(id, 'foods', FoodModel, FoodRegisterView);
		},
		meals: function() {
			this.list('meals', MealsListView);
		},
		meal: function(id) {
			this.register(id, 'meals', MealModel, MealRegisterView);
		},

		oils: function() {
			this.list('oils', OilsListView);
		},
		oil: function(id) {
			this.register(id, 'oils', OilModel, OilRegisterView);
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

		backup: function() {
			App.mainRegion.show(new BackupView());
		},

		settings: function() {
			// FIXME always will be id 1? How I can guarantee this?
			var objectStore = App.indexedDB.db.transaction(['settings']).objectStore('settings').get(1);
			objectStore.onsuccess = function(event) {
				App.mainRegion.show(new SettingsView(new SettingModel(event.target.result)));
			};
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
