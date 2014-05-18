define([
	'marionette'
	, 'app'
	, 'models/indexedDB'
	, 'text!../../templates/expenses.tpl'
], function (Marionette, App, IndexedDB, Template) {
	var ItemView = Marionette.ItemView.extend({
		template: Template,
		tagName: 'div',
		className: 'box'
		, events: {
			"click #btnSave": "save"
		}

		, initialize: function() {

			// var indexedDB = {};

			// indexedDB.db = null;
			// indexedDB.open = function() {

			// 	var request = window.indexedDB.open('yaew', 1);

			// 	// console.log('show before onsuccess...');
			// 	// console.log(this);

			// 	var self = this;

			// 	request.onsuccess = function(e) {
			// 		self.db = e.target.result;

			// 		console.log('Show inside onsucess');
			// 		console.log(self);
			// 		console.log(self.db);
			// 	};

			// 	request.onerror = function(err) {
			// 		console.log("Warning! Expense app has an error:");
			// 		console.log(err);
			// 	};

			// 	return request;
				
			// };

			// this.indexedDB = indexedDB;
			// this.indexedDB.open();

			// TODO move to app.js
			this.indexedDB = new IndexedDB();
			this.indexedDB.openDB();
		}

		, save: function(ev) {
			ev.preventDefault();

			console.log('Show indexedDB inside view save function');
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
