define([
    'backbone'
    , 'app'
], function (Backbone, App) {
    var ExpenseModel = Backbone.Model.extend({
		defaults: {
			date: null
			, ammount: 0.00
			, category: null
			, memo: null
		}

		, initialize: function(id) {
			if (id != undefined) {
console.log(App);
console.log(App.indexedDB);
console.log(App.indexedDB.db);
console.log(id);
				// FIXME not working retrieve data...
				var transaction = App.indexedDB.db.transaction(['expenses']);
				var objectStore = transaction.objectStore('expenses');
				var request = objectStore.get("1");
				request.onerror = function(event) {
					throw new Error("Failed to access indexedDB: Can't get expense's data.");
				};
				request.onsuccess = function(event) {
					console.log(event);
					console.log(request);
					console.log(request.result);
					// alert("Name for SSN 444-44-4444 is " + request.result.name);
				};
			}
			this.url = App.getBaseURL() + 'expense/';
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';

			if (attr.ammount == '')
				return 'Ammount can\'t be empty!';

			if (attr.category == '')
				return 'Category can\'t be empty!';

			if (attr.memo == '')
				return 'Memo can\'t be empty!';
		}
    });

    return ExpenseModel;
});
