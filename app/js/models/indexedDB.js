define([
], function () {
	var IndexedDB = function () {
		this.db =  function() {
			if (!window.indexedDB)
				console.error('[WARNING] No indexedDB API to start app. Is your browser supported?');

			return null;
		};
		this.openDB = function() {
			var self = this;
			var request = window.indexedDB.open('yaew', 1);

			request.onsuccess = function(e) {
				self.db = e.target.result;
			};

			request.onerror = function(err) {
				console.error("[WARNING] Failed to start indexedDB!");
				console.error(err);
			};

			request.onupgradeneeded = function(event) { 
				var db = event.target.result;
				db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true});
				db.createObjectStore('foods', { keyPath: 'id', autoIncrement: true});
				db.createObjectStore('motorcycles', { keyPath: 'id', autoIncrement: true});
				db.createObjectStore('gyms', { keyPath: 'id', autoIncrement: true});
				db.createObjectStore('timesheets', { keyPath: 'id', autoIncrement: true});

				console.log('onupgradeneed!');
			};

			return request;
		};
		// , saveItem: function(model, objectStore){
		// }

		return this;
    };

    return IndexedDB;
});
