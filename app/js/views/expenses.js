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
			// if (window.indexedDB) {
			// 	console.log('has indexedDB');
			// } else {
			// 	console.log('no indexedDb to play... :\'(');
			// }

			var indexedDB = {};

			indexedDB.db = null;
			indexedDB.open = function() {

				var request = window.indexedDB.open('yaew', 1);

				// console.log('show before onsuccess...');
				// console.log(this);

				var self = this;

				request.onsuccess = function(e) {
					self.db = e.target.result;

					console.log('Show inside onsucess');
					console.log(self);
					console.log(self.db);
				};

				request.onerror = function(err) {
					console.log("Warning! Expense app has an error:");
					console.log(err);
				};

				// request.onupgradeneeded =function(e) {
				// 	this.db = e.target.result;

				// 	if (this.db.objectStoreNames.contains('expenses')) {
				// 		console.log("Removing expense\'s db");
				// 		this.db.deleteObjectStore('expenses');
				// 	}

				// 	var objectStore = this.db.createObjectStore('expenses', {keyPath: 'id', autoIncrement: true});

				// 	console.log('Object has been stored');
				// };

				return request;
				
			};

			this.indexedDB = indexedDB;

			this.indexedDB.open();
		}

		, save: function(ev) {
			ev.preventDefault();

			// console.log('show indexedDB before open');
			// console.log(this.indexedDB);

			// console.log('Show indexedDB after open');
			console.log(this.indexedDB.db);

			var value = {id: 1, description: 'test', value: 1.99};

			var transaction = this.indexedDB.db.transaction(['expenses'], 'readwrite');
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
