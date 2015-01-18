define([
	'backbone'
	, 'app'
	, 'models/indexedDB'
	, 'collections/generic'
	, 'views/expense/register'
	, 'views/expense/list'
	, 'views/expense/credit/register'
	, 'views/expense/credit/list'
	, 'views/motorcycle/oil/register'
	, 'views/motorcycle/oil/list'
	, 'views/motorcycle/register'
	, 'views/motorcycle/list'
	, 'views/timesheet/register'
	, 'views/timesheet/list'
	, 'views/backup'
	, 'views/settings'
	, 'models/expense'
	, 'models/oil'
	, 'models/motorcycle'
	, 'models/timesheet'
	, 'models/setting'
], function (Backbone, App, IndexedDB, Collection, ExpenseRegisterView, ExpensesListView, CreditRegisterView, CreditsListView, OilRegisterView, OilsListView, MotorcycleRegisterView, MotorcyclesListView, TimesheetRegisterView, TimesheetsListView, BackupView, SettingsView, ExpenseModel, OilModel, MotorcycleModel, TimesheetModel, SettingModel) {
	var DailyActivitiesController = Backbone.Router.extend({
		routes: {
			'expense/credits': 'credits',
			'expense/credit/owner/new': 'owner',
			'expense/credit/owner/:id': 'owner',
			'expense/credit/new': 'credit',
			'expense/credit/:id': 'credit',
			'expenses': 'expenses',
			'expense/new': 'expense',
			'expense/:id': 'expense',

			'motorcycle/oils': 'oils',
			'motorcycle/oil/new': 'oil',
			'motorcycle/oil/:id': 'oil',
			'motorcycles': 'motorcycles',
			'motorcycle/new': 'motorcycle',
			'motorcycle/:id': 'motorcycle',

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

		owner: function(id) {
			this.register(id, 'owners', ExpenseModel, ExpenseRegisterView);
		},

		credit: function(id) {
			this.register(id, 'credtis', ExpenseModel, ExpenseRegisterView);
		},

		credits: function() {
			var entities = [],
				owners,
				credits
			;

			App.indexedDB.db.transaction(['owners'], 'readonly').objectStore('credits').openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					entities.push(cursor.value);
					cursor.continue();
				} else {
					owners = new Collection(entities);

					App.indexedDB.db.transaction(['credits'], 'readonly').objectStore('credits').openCursor().onsuccess = function(e) {
						var cursor = e.target.result;
						if (cursor) {
							entities.push(cursor.value);
							cursor.continue();
						} else {
							credits = new Collection(entities);
							App.mainRegion.show(new CreditsListView(owners, credits));
						}
					};
				}
			};
		},

		oils: function() {
			this.list('oils', OilsListView);
		},
		oil: function(id) {
console.log('oil register');
			this.register(id, 'oils', OilModel, OilRegisterView);
		},
		motorcycles: function() {
			this.list('motorcycles', MotorcyclesListView);
		},
		motorcycle: function(id) {
			// this.register(id, 'motorcycles', MotorcycleModel, MotorcycleRegisterView);
			var settingsObjectStore = App.indexedDB.db.transaction(['settings']).objectStore('settings').get(1);
			settingsObjectStore.onsuccess = function(event) {
				var motorcycleDefaults = event.target.result.motorcycle,
					motorcycleObjectStore = App.indexedDB.db.transaction(['motorcycles']).objectStore('motorcycles').get(1)
				;
				motorcycleObjectStore.onsuccess = function(event) {
					var model = new MotorcycleModel(motorcycleDefaults);
					App.mainRegion.show(new MotorcycleRegisterView(model));
				};
			};
		},

		timesheets: function() {
			this.list('timesheets', TimesheetsListView, new TimesheetModel);
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

		list: function(entity, View, model) {
			var entities = [];

			// var indexedDB = new IndexedDB();
			// indexedDB.openDB();
			// indexedDB.db.transaction([entity], 'readonly').objectStore(entity).openCursor().onsuccess = function(e) {
			App.indexedDB.db.transaction([entity], 'readonly').objectStore(entity).openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					entities.push(cursor.value);
					cursor.continue();
				} else {
					var collection = new Collection(entities);
					App.mainRegion.show(new View(collection, model));
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

			// var indexedDB = new IndexedDB();
			// indexedDB.openDB();
			// var objectStore = indexedDB.db.transaction([entity]).objectStore(entity).get(id != undefined ? parseInt(id) : 0);
			var objectStore = App.indexedDB.db.transaction([entity]).objectStore(entity).get(id != undefined ? parseInt(id) : 0);
			objectStore.onsuccess = function(event) {
				var model = new Model(event.target.result);
				App.mainRegion.show(new RegisterView(model));
			};
		}
	});

	return DailyActivitiesController;
});
