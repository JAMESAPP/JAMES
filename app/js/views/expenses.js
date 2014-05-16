define([
	'marionette'
	, 'app'
	, 'text!../../templates/expenses.tpl'
], function (Marionette, App, Template) {
	var ItemView = Marionette.ItemView.extend({
		template: Template,
		tagName: 'div',
		className: 'box'
		, events: {
			"click #btnSave": "save"
		}

		, initialize: function() {
			if (window.indexedDB) {
				console.log('has indexedDB');
			} else {
				console.log('no indexedDb to play... :\'(');
			}

			this.db = {};
			this.bozo ={};
			var self = this;
			var request = window.indexedDB.open('yaew', 1);

			request.onsuccess = function(e) {
				self.db = e.target.Result;
			};

			request.onerror = function(err) {
				console.log("Warning! Expense app has an error:");
				console.log(err);
			};

			request.onupgradeneeded =function(e) {
				self.db = e.target.result;

				if (self.db.objectStoreNames.contains('expenses')) {
					self.db.deleteObjectStore('expenses');
				}

				var objectStore = this.db.createObjectStore('expenses', {keyPath: 'id', autoIncrement: true});


				console.log('Object has been stored');

			};
			console.log('show db...');
			console.log(this.db);
		}

		, save: function(ev) {
			ev.preventDefault();
			console.log(window.indexedDB);

			console.log('show db in save....');
			console.log(this.db);
			console.log(this.bozo);
			console.log(this);
			console.log(ev);

			var transaction = this.db.transaction(['expenses'], 'readwrite');
			var value = {id: 1, description: 'test', value: 1.99};

			var store = transaction.objectStore('expenses');
			var request = store.add(value);

			request.onsuccess = function(e) {
				console.log('Value salved');
				console.log(value);
			};

			request.onerror = function(e) {
				console.log('Failed to save data!');
				console.log(e);
			};
		}
	});

	return ItemView;
});
