define([
	'underscore'
	, 'marionette'
	, 'firebase'
	, 'firebaseSimpleLogin'
	, 'app'
	, 'views/bindingView'
	, 'text!../../templates/backup.tpl'
], function (_, Marionette, Firebase, FirebaseSimpleLogin, App, BidingView, Template) {
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
			this.expenses = [];
			this.foods = [];
			this.groceries = [];
			this.gyms = [];
			this.motorcycles = [];
			this.timesheets = [];
			this.configurations = [];

			var self = this,
				transaction = App.indexedDB.db.transaction(['timesheets', 'expenses', 'foods', 'groceries', 'gyms', 'motorcycles', 'timesheets', 'configurations'], 'readonly');
			var	expenseCursor = transaction.objectStore('expenses').openCursor(),
				foodCursor = transaction.objectStore('foods').openCursor(),
				groceryCursor = transaction.objectStore('groceries').openCursor(),
				gymCursor = transaction.objectStore('gyms').openCursor(),
				motorcycleCursor = transaction.objectStore('motorcycles').openCursor(),
				timesheetCursor = transaction.objectStore('timesheets').openCursor(),
				configurationsObject = transaction.objectStore('configurations').get(1)
			;

			expenseCursor.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.expenses.push(cursor.value);
					cursor.continue();
				}
			};

			foodCursor.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.foods.push(cursor.value);
					cursor.continue();
				}
			};

			groceryCursor.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.groceries.push(cursor.value);
					cursor.continue();
				}
			};

			gymCursor.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.gyms.push(cursor.value);
					cursor.continue();
				}
			};

			motorcycleCursor.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.motorcycles.push(cursor.value);
					cursor.continue();
				}
			};

			timesheetCursor.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.timesheets.push(cursor.value);
					cursor.continue();
				}
			};

			configurationsObject.onsuccess = function(e) {
				if (e.target.result == undefined) {
					self.$el.find('#spanMessage').removeClass();
					self.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-danger');
					self.$el.find('#spanMessage').html('[ERROR] Need save information about configuration before sync data.').fadeIn();
				} else {
					self.configurations = e.target.result;
					self.cloud = new Firebase('https://jamesapp.firebaseIO.com');
					self.auth = new FirebaseSimpleLogin(self.cloud, function(error, user) {
						if (error) {
							console.error(error);
							self.$el.find('#spanMessage').removeClass();
							self.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-danger');
							self.$el.find('#spanMessage').html('[AUTH ERROR] code: ' + error.code + ' message: ' + error.message).fadeIn().delay(5000).fadeOut();
						} else if (user) {
							self.$el.find('#spanMessage').removeClass();
							self.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-success');
							self.$el.find('#spanMessage').html('User is logged: ' + user.email).fadeIn().delay(5000).fadeOut();
							self.$el.find('.disabled').removeClass('disabled');
						} else {
							console.log('user logout');
							self.$el.find('#spanMessage').removeClass();
							self.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-info');
							self.$el.find('#spanMessage').html('user logout!').fadeIn().delay(5000).fadeOut();
						}
					});

					self.auth.login('password', {
						email: self.configurations.cloudAuth.email
						, password: self.configurations.cloudAuth.password
						, rememberMe: true
					});
				}
			};

// transaction.objectStore('configurations').clear();
		}

		, onShow: function() {
			this.$el.find('#spanMessage').removeClass();
			this.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-warning');
			this.$el.find('#spanMessage').html('Contacting cloud...').fadeIn();
		}

		, saveOnCloud: function(ev) {
			ev.preventDefault();

			var self = this;
			this.cloud.set({
				expenses: self.expenses
				, foods: self.foods
				, groceries: self.groceries
				, gyms: self.gyms
				, motorcycles: self.motorcycles
				, timesheets: self.timesheets
				, configurations: self.configurations
			});

			this.$el.find('#spanMessage').removeClass();
			this.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-success');
			this.$el.find('#spanMessage').html('Data was saved on cloud successfully!').fadeIn().delay(5000).fadeOut();
		}
		, syncWithCloud: function(ev) {
			ev.preventDefault();

			// FIXME add to all entities and put code inside onsuccess - error with async request
			var self = this,
				transaction = App.indexedDB.db.transaction(['timesheets', 'expenses', 'foods', 'groceries', 'gyms', 'motorcycles', 'timesheets', 'configurations'], 'readwrite')
			;


			// this.transaction.objectStore('foods').clear().onsuccess = function(event) {
			// 	console.log('Foods cleared...');
			// };
			// this.transaction.objectStore('groceries').clear().onsuccess = function(event) {
			// 	console.log('Groceries cleared...');
			// };
			// this.transaction.objectStore('gyms').clear().onsuccess = function(event) {
			// 	console.log('Gyms cleared...');
			// };
			// this.transaction.objectStore('motorcycles').clear().onsuccess = function(event) {
			// 	console.log('Motorcycles cleared...');
			// };
			// this.transaction.objectStore('timesheets').clear().onsuccess = function(event) {
			// 	console.log('Timesheets cleared...');
			// };
			// this.transaction.objectStore('configurations').clear().onsuccess = function(event) {
			// 	console.log('Configurations cleared...');
			// };

			this.cloud.on('value', function(snapshot) {
				if (snapshot.val() !== null) {
					// expenses: self.expenses
					transaction.objectStore('expenses').clear().onsuccess = function(event) {
						console.log('Expenses cleared...');
						_.forEach(snapshot.val().expenses, function(element, index, list) {
							transaction.objectStore('expenses').add(element).onsuccess = function (event) {
								console.log('Re-added expenses id #' + element.id);
							};
						});
					};
					
					// , foods: self.foods
					// , groceries: self.groceries
					// , gyms: self.gyms
					// , motorcycles: self.motorcycles
					// , timesheets: self.timesheets
					// , configurations: self.configurations
				}
			});
		}

		, saveOnDisk: function(ev) {
			ev.preventDefault();

			// TODO save on disk
			this.$el.find('#spanMessage').removeClass();
			this.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-danger');
			this.$el.find('#spanMessage').html('Not implemented yet!!').fadeIn().delay(5000).fadeOut();
		}
		, syncWithDisk: function(ev) {
			ev.preventDefault();

			// TODO sync with disk
			this.$el.find('#spanMessage').removeClass();
			this.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-danger');
			this.$el.find('#spanMessage').html('Not implemented yet!!').fadeIn().delay(5000).fadeOut();
		}

	});

	return ItemView;
});
