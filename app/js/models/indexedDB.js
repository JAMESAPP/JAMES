define([
    'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({

		initialize: function(params) {
			this.db = null;

			// if (window.indexedDB) {
			// 	console.log('has indexedDB');
			// } else {
			// 	console.log('no indexedDb to play... :\'(');
			// }
		}

		, openDB: function() {
			var self = this;
			var request = window.indexedDB.open('yaew', 1);

			// console.log('show before onsuccess...');
			// console.log(this);

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

			request.onupgradeneeded = function(event) { 
				var db = event.target.result;
				var objectStore = db.createObjectStore('expenses', { keyPath: 'id'});

				console.log('through onupgradeneed');
			};

			return request;
		}

		, saveItem: function(model, objectStore){
		}
    });

    return Model;
});
