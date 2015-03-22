define([
	'underscore'
	, 'marionette'
	, 'app'
	, 'views/bindingView'
	, 'views/register'
	, 'hideShowPassword'
], function (_, Marionette, App, BindingView, RegisterView) {
	var ItemView = RegisterView.extend({
		tagName: 'div',
		className: 'box'
		, template: 'app/templates/settings.tpl'
		, objectStore: 'settings'
		, events: function() {
			return _.extend({}, RegisterView.prototype.events, {
				'click #btnHideShowPassword': 'hideShowPassword'
				, 'click #btnDeleteSettings': 'deleteSettings'
				, 'click #btnCleanLocalStorage': 'cleanLocalStorage'
			});
		}
		, hideShowPassword: function(ev) {
			ev.preventDefault();
			this.$el.find('#inputCloudAuthPassword').togglePassword();
		}
		, deleteSettings: function(ev) {
			ev.preventDefault();
			
			var self = this;
			App.indexedDB.db.transaction([this.objectStore], 'readwrite').objectStore(this.objectStore).delete(1).onsuccess = function(e) {
				self.$el.find('#spanMessage').removeClass();
				self.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-danger');
				self.$el.find('#spanMessage').html('Settings removed!! Edit and save again!').fadeIn().delay(5000).fadeOut();
			};
		}
		, cleanLocalStorage: function(ev) {
			ev.preventDefault();
			// TODO implement [] app.getEntities();
			var transaction = App.indexedDB.db.transaction(['expenses', 'oils', 'refuels', 'timesheets', 'settings'], 'readwrite');

			transaction.objectStore('settings').clear().onsuccess = function(event) {
				console.log('Cleaned settings');
			};

			transaction.objectStore('expenses').clear().onsuccess = function(event) {
				console.log('Cleaned expenses');
			};

			transaction.objectStore('oils').clear().onsuccess = function(event) {
				console.log('Cleaned oils');
			};

			transaction.objectStore('refuels').clear().onsuccess = function(event) {
				console.log('Cleaned refuels');
			};

			transaction.objectStore('timesheets').clear().onsuccess = function(event) {
				console.log('Cleaned timesheets');
			};

			transaction.objectStore('owners').clear().onsuccess = function(event) {
				console.log('Cleaned owners');
			};

			transaction.objectStore('credits').clear().onsuccess = function(event) {
				console.log('Cleaned credits');
			};
		}
	});

	return ItemView;
});
