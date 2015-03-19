define([
	'underscore'
	, 'marionette'
	, 'firebase'
	, 'firebaseSimpleLogin'
	, 'app'
	, 'views/bindingView'
	, 'models/setting'
	, 'models/expense'
	, 'models/motorcycle/refuel'
	, 'models/motorcycle/oil'
	, 'models/timesheet'
	, 'models/backup'
	, 'models/generic'
	, 'collections/generic'
], function (_, Marionette, Firebase, FirebaseSimpleLogin, App, BidingView, SettingsModel, ExpenseModel, MotorcycleRefuelModel, MotorcycleOilModel, TimesheetModel, BackupModel, Model, Collection) {
	var ItemView = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'box'
		, events: {
			'click #btnSaveOnCloud': 'saveOnCloud'
			, 'click #btnSyncWithCloud': 'syncWithCloud'
			, 'click #btnSaveOnDisk': 'saveOnDisk'
			, 'click #btnSyncWithDisk': 'syncWithDisk'
			, 'click #btnLogin': 'login'
			, 'click #btnHideShowPassword': 'hideShowPassword'
			, 'click #btnEnable': 'enable'
			, 'click #btnSaveOnCustomBackend': 'saveOnCustomBackend'
			, 'click #btnSyncWithCustomBackend': 'syncWithCustomBackend'
		}
		// TODO adapt html
		, template: 'app/templates/backup.tpl'

		, onShow: function() {
			this.$el.find('#spanMessage').removeClass();
			this.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-warning');
			this.$el.find('#spanMessage').html('Contacting cloud...').fadeIn();

			this.expenses = [];
			this.oils = [];
			this.refuels = [];
			this.timesheets = [];
			this.settings = [];
			this.owners = [];
			this.credits = [];

			var self = this,
				transaction = App.indexedDB.db.transaction(['settings', 'expenses', 'refuels', 'oils', 'timesheets', 'credits', 'owners'], 'readonly');
			var	expenseCursor = transaction.objectStore('expenses').openCursor(),
				oilCursor = transaction.objectStore('oils').openCursor(),
				refuelCursor = transaction.objectStore('refuels').openCursor(),
				timesheetCursor = transaction.objectStore('timesheets').openCursor(),
				settingsObject = transaction.objectStore('settings').get(1),
				ownerCursor = transaction.objectStore('owners').openCursor(), // FIXME use owner
				creditCursor = transaction.objectStore('credits').openCursor() // FIXME use credit
			;

			expenseCursor.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.expenses.push(cursor.value);
					cursor.continue();
				}
			};

			oilCursor.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.oils.push(cursor.value);
					cursor.continue();
				}
			};

			refuelCursor.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.refuels.push(cursor.value);
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

			ownerCursor.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.owners.push(cursor.value);
					cursor.continue();
				}
			};

			creditCursor.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.credits.push(cursor.value);
					cursor.continue();
				}
			};

			// var authRef = new Firebase("https://jamesapp.firebaseio.com/.info/authenticated");
			settingsObject.onsuccess = function(e) {
				if (e.target.result == undefined) {
					self.$el.find('#spanMessage').removeClass();
					self.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-danger');
					self.$el.find('#spanMessage').html('[ERROR] Need save information about settings before sync data.').fadeIn();
				} else {
					authRef.on("value", function(snap) {
						if (snap.val() === true) {
							console.log("authenticated");
							self.$el.find('#spanMessage').removeClass();
							self.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-success');
							self.$el.find('#spanMessage').html('authenticated').fadeIn().delay(5000).fadeOut();
						} else {
							console.log("not authenticated");
							self.$el.find('#spanMessage').removeClass();
							self.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-danger');
							self.$el.find('#spanMessage').html('NOT authenticated.').fadeIn().delay(5000).fadeOut();
						}
					});

					self.settings = e.target.result;

					self.$el.find('#inputEmail').val(self.settings.cloudAuth.email);
					self.$el.find('#inputPassword').val(self.settings.cloudAuth.password);

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
							console.log('User is logged: ' + user.email);
						} else {
							console.log('user logout');
							self.$el.find('#spanMessage').removeClass();
							self.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-info');
							self.$el.find('#spanMessage').html('user logout!').fadeIn().delay(5000).fadeOut();
						}
					});

					// self.auth.login('password', {
					// 	email: self.settings.cloudAuth.email
					// 	, password: self.settings.cloudAuth.password
					// 	, rememberMe: false
					// });
				}
			};

			settingsObject.onerror = function(event) {
				console.error(event);
				self.$el.find('#spanMessage').removeClass();
				self.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-danger');
				self.$el.find('#spanMessage').html('[SETTINGS ERROR] a bizarre error has occurred!!!!').fadeIn().delay(5000).fadeOut();
			};
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

		, saveOnCloud: function(ev) {
			ev.preventDefault();

			var self = this,
				data = {
				expenses: self.expenses

				, oils: self.oils
				, refuels: self.refuels
				, timesheets: self.timesheets
				, owners: self.owners
				, credits: self.credits

			};
			this.cloud.set(data, function(error) {
				if (error) {
					this.$el.find('#spanMessage').removeClass();
					this.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-error');
					this.$el.find('#spanMessage').html('Error saving data! ' + error).fadeIn().delay(5000).fadeOut();
					console.error(error);
				} else {
					console.log(data);

					if (data.expenses != undefined)
						self.$el.find('#tdExpenseUpload').html('<span class="glyphicon glyphicon-ok"></span>');

					if (data.oils != undefined)
						self.$el.find('#tdOilUpload').html('<span class="glyphicon glyphicon-ok"></span>');

					if (data.refuels != undefined)
						self.$el.find('#tdRefuelUpload').html('<span class="glyphicon glyphicon-ok"></span>');

					if (data.timesheets != undefined)
						self.$el.find('#tdTimesheetUpload').html('<span class="glyphicon glyphicon-ok"></span>');

					if (data.owners != undefined)
						self.$el.find('#tdOwnerUpload').html('<span class="glyphicon glyphicon-ok"></span>');

					if (data.credits != undefined)
						self.$el.find('#tdCreditUpload').html('<span class="glyphicon glyphicon-ok"></span>');

					self.$el.find('#spanMessage').removeClass();
					self.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-success');
					self.$el.find('#spanMessage').html('Data was saved on cloud successfully!').fadeIn().delay(5000).fadeOut();
				}
			});
		}
		, syncWithCloud: function(ev) {
			ev.preventDefault();

			var self = this;

			this.cloud.on('value', function(snapshot) {
				var transaction = App.indexedDB.db.transaction(['expenses', 'oils', 'refuels', 'timesheets', 'settings', 'owners', 'credits'], 'readwrite');

				if (snapshot.val() !== null) {
					console.log(snapshot.val());

					transaction.objectStore('expenses').clear().onsuccess = function(event) {
						_.forEach(snapshot.val().expenses, function(element, index, list) {
							transaction.objectStore('expenses').add(element).onsuccess = function(event) {
								console.log('Re-added expense id #' + element.id);
								self.$el.find('#tdExpenseDownload').html('<span class="glyphicon glyphicon-ok"></span>');
							};
						});
					};

					transaction.objectStore('oils').clear().onsuccess = function(event) {
						_.forEach(snapshot.val().oils, function(element, index, list) {
							transaction.objectStore('oils').add(element).onsuccess = function (event) {
								console.log('Re-added oil id #' + element.id);
								self.$el.find('#tdOilDownload').html('<span class="glyphicon glyphicon-ok"></span>');
							};
						});
					};

					transaction.objectStore('refuels').clear().onsuccess = function(event) {
						_.forEach(snapshot.val().refuels, function(element, index, list) {
							transaction.objectStore('refuels').add(element).onsuccess = function (event) {
								console.log('Re-added refuel id #' + element.id);
								self.$el.find('#tdRefuelDownload').html('<span class="glyphicon glyphicon-ok"></span>');
							};
						});
					};

					transaction.objectStore('timesheets').clear().onsuccess = function(event) {
						_.forEach(snapshot.val().timesheets, function(element, index, list) {
							transaction.objectStore('timesheets').add(element).onsuccess = function (event) {
								console.log('Re-added timesheet id #' + element.id);
								self.$el.find('#tdTimesheetDownload').html('<span class="glyphicon glyphicon-ok"></span>');
							};
						});
					};

					transaction.objectStore('owners').clear().onsuccess = function(event) {
						_.forEach(snapshot.val().owners, function(element, index, list) {
							transaction.objectStore('owners').add(element).onsuccess = function (event) {
								console.log('Re-added owner id #' + element.id);
								self.$el.find('#tdOwnerDownload').html('<span class="glyphicon glyphicon-ok"></span>');
							};
						});
					};

					transaction.objectStore('credits').clear().onsuccess = function(event) {
						_.forEach(snapshot.val().credits, function(element, index, list) {
							transaction.objectStore('credits').add(element).onsuccess = function (event) {
								console.log('Re-added credit id #' + element.id);
								self.$el.find('#tdCreditDownload').html('<span class="glyphicon glyphicon-ok"></span>');
							};
						});
					};
				}
			});
		}

		, login: function(ev) {
			ev.preventDefault();

			var email = this.$el.find('#inputEmail').val(),
				password = this.$el.find('#inputPassword').val()
			;

			console.log('Data used to auth: email -> ' + email + ' password: ' + password);
			this.$el.find('#spanMessage').removeClass();
			this.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-warning');
			this.$el.find('#spanMessage').html('Data used to auth: email -> ' + email + ' password: ' + password).fadeIn().delay(5000).fadeOut();

			this.auth.login('password', {
				email: email
				, password: password
				, rememberMe: false
			});
		}
		, hideShowPassword: function(ev) {
			ev.preventDefault();
			this.$el.find('#inputPassword').togglePassword();
		}
		, enable: function(ev) {
			ev.preventDefault();
			this.$el.find('.disabled').removeClass('disabled');
		}

		, saveOnCustomBackend: function(ev) {
			ev.preventDefault();

			var self = this,
				settings = App.indexedDB.db.transaction(['settings']).objectStore('settings').get(1),
				backendAddress,
				backup = new BackupModel()
			;

			settings.onsuccess = function(event) {
				backendAddress = event.target.result.backend;

				backup.saveModelOnBackend(self.expenses, 'expenses', backendAddress + '/expenses');
				backup.saveModelOnBackend(self.oils, 'oils', backendAddress + '/oils');
				backup.saveModelOnBackend(self.refuels, 'refuels', backendAddress + '/refuels');
				backup.saveModelOnBackend(self.timesheets, 'timesheets', backendAddress + '/timesheets');
			};
		}

		, syncWithCustomBackend: function(ev) {
			ev.preventDefault();

			var transaction = App.indexedDB.db.transaction(['expenses', 'oils', 'refuels', 'timesheets', 'settings', 'owners', 'credits'], 'readwrite'),
				url,
				settings = transaction.objectStore('settings').get(1),
				backup = new BackupModel();
			;

			settings.onsuccess = function(event) {
				url = event.target.result.backend;

				backup.repopulate('expenses', transaction, url, '#tdExpenseDownload');
				backup.repopulate('oils', transaction, url, '#tdOilDownload');
				backup.repopulate('refuels', transaction, url, '#tdRefuelDownload');
				backup.repopulate('timesheets', transaction, url, '#tdTimesheetDownload');
				backup.repopulate('owners', transaction, url, '#tdOwnerDownload');
				backup.repopulate('credits', transaction, url, '#tdCreditDownload');
			};
		}
	});

	return ItemView;
});
