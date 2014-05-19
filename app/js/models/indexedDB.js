define([
    'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({

		initialize: function(params) {
			this.db = null;
			if (!window.indexedDB)
				console.log('[WARNING] No indexedDB API to start app. Your browser is supported?');
		}

		, openDB: function() {
			var self = this;
			var request = window.indexedDB.open('yaew', 1);

			request.onsuccess = function(e) {
				self.db = e.target.result;
			};

			request.onerror = function(err) {
				console.log("Warning! Failed to start indexedDB!");
				console.log(err);
			};

			request.onupgradeneeded = function(event) { 
				var db = event.target.result;
				db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true});
				db.createObjectStore('foods', { keyPath: 'id', autoIncrement: true});
				db.createObjectStore('motorcycles', { keyPath: 'id', autoIncrement: true});
				db.createObjectStore('gyms', { keyPath: 'id', autoIncrement: true});
				db.createObjectStore('timesheets', { keyPath: 'id', autoIncrement: true});
			};

			return request;
		}

		, saveItem: function(model, objectStore){
		}
    });

    return Model;
});
