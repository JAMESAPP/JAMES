define([
	'marionette'
	, 'firebase'
	, 'firebaseSimpleLogin'
	, 'app'
	, 'views/bindingView'
	, 'text!../../templates/backup.tpl'
], function (Marionette, Firebase, FirebaseSimpleLogin, App, BidingView, Template) {
	var ItemView = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'box'
		, events: {
			'click #btnSaveOnCloud': 'saveOnCloud'
			, 'click #btnSyncWithCloud': 'syncWithCloud'
			, 'click #btnSaveOnDisk': 'saveOnDisk'
			, 'click #btnSyncWithDisk': 'syncWithDisk'
		}
		, template: Template

		, initialize: function() {

			var self = this;
			var objectStore = App.indexedDB.db.transaction(['configurations']).objectStore('configurations').get(1);
			objectStore.onsuccess = function(event) {
				self.configurations = event.target.result;
			};

			this.expenses = [];
			this.foods = [];
			this.groceries = [];
			this.gyms = [];
			this.motorcycles = [];
			this.timesheets = [];
			this.configurations = [];

			var transaction = App.indexedDB.db.transaction(['timesheets', 'expenses', 'foods', 'groceries', 'gyms', 'motorcycles', 'timesheets', 'configurations'], 'readonly'),
				expenseStore = transaction.objectStore('expenses').openCursor(),
				foodStore = transaction.objectStore('foods').openCursor(),
				groceryStore = transaction.objectStore('groceries').openCursor(),
				gymStore = transaction.objectStore('gyms').openCursor(),
				motorcycleStore = transaction.objectStore('motorcycles').openCursor(),
				timesheetStore = transaction.objectStore('timesheets').openCursor(),
				configurationsStore = transaction.objectStore('configurations').openCursor()
			;			

			expenseStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.expenses.push(cursor.value);
					cursor.continue();
				}
			};

			foodStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.foods.push(cursor.value);
					cursor.continue();
				}
			};

			groceryStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.groceries.push(cursor.value);
					cursor.continue();
				}
			};

			gymStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.gyms.push(cursor.value);
					cursor.continue();
				}
			};

			motorcycleStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.motorcycles.push(cursor.value);
					cursor.continue();
				}
			};

			timesheetStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.timesheets.push(cursor.value);
					cursor.continue();
				}
			};

			configurationsStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					// FIXME what's wrong?
					self.configurations.push(cursor.value);
					cursor.continue();
				}
			};
		}

		, saveOnCloud: function(ev) {
			ev.preventDefault();

			var self = this,
				cloud = new Firebase('https://jamesapp.firebaseIO.com'),
				auth = new FirebaseSimpleLogin(cloud, function(error, user) {
				if (error) {
					console.error(error);
					self.$el.find('#spanMessage').addClass('alert alert-warning');
					self.$el.find('#spanMessage').html('[AUTH ERROR] code: ' + error.code + ' message: ' + error.message).fadeIn().delay(5000).fadeOut();
				} else if (user) {
					cloud.set({
						expenses: this.expenses
						, foods: this.foods
						, groceries: this.groceries
						, gyms: this.gyms
						, motorcycles: this.motorcycles
						, timesheets: this.timesheets
						, configurations: this.configurations
					});	
				} else {
					console.log('user logout');
				}
			});

			auth.login('password', {
				email: this.configuration.cloudAuth.email
				, password: this.configuration.cloudAuth.password
			});

			this.$el.find('#spanMessage').addClass('alert alert-success');
			this.$el.find('#spanMessage').html('Data was saved on cloud successfully!').fadeIn().delay(5000).fadeOut();
		}
		, syncWithCloud: function(ev) {
			ev.preventDefault();

			// TODO sync with firebase
		}

		, saveOnDisk: function(ev) {
			ev.preventDefault();

			// TODO save on disk
		}
		, syncWithDisk: function(ev) {
			ev.preventDefault();

			// TODO sync with disk
		}

	});

	return ItemView;
});
