define([
	'marionette'
	, 'firebase'
	, 'app'
	, 'views/bindingView'
	, 'text!../../templates/backup.tpl'
], function (Marionette, Firebase, App, BidingView, Template) {
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

		, initialize: function(/*expenses, foods,	groceries, gyms, motorcycles, timesheets, configurations*/) {

			this.expenses = [];
			this.foods = [];
			this.groceries = [];
			this.gyms = [];
			this.motorcycles = [];
			this.timesheets = [];
			this.configurations = [];

			var self = this,
				transaction = App.indexedDB.db.transaction(['timesheets', 'expenses', 'foods', 'groceries', 'gyms', 'motorcycles', 'timesheets', 'configurations'], 'readonly'),
				expenseStore = transaction.objectStore('expenses').openCursor(),
				foodStore = transaction.objectStore('foods').openCursor(),
				groceryStore = transaction.objectStore('groceries').openCursor(),
				gymStore = transaction.objectStore('gyms').openCursor(),
				motorcycleStore = transaction.objectStore('motorcycles').openCursor(),
				timesheetStore = transaction.objectStore('timesheets').openCursor(),
				configurationsStore = transaction.objectStore('configurations').openCursor()
			;			

			expenseStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.expenses.push(cursor.value);
					cursor.continue();
				}
			};

			foodStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.foods.push(cursor.value);
					cursor.continue();
				}
			};

			groceryStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.groceries.push(cursor.value);
					cursor.continue();
				}
			};

			gymStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.gyms.push(cursor.value);
					cursor.continue();
				}
			};

			motorcycleStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.motorcycles.push(cursor.value);
					cursor.continue();
				}
			};

			timesheetStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.timesheets.push(cursor.value);
					cursor.continue();
				}
			};

			configurationsStore.onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					self.configurations.push(cursor.value);
					cursor.continue();
				}
			};



			// if (entity == undefined || entity == null)
			// 	throw new Error('Must have: a model!!');

			// this.model = entity;

			// if (objectStore != null || objectStore != undefined)
			// 	this.objectStore = objectStore;
			// if (this.objectStore == null || this.objectStore == undefined)
			// 	throw new Error('Must have: objectStore! Define property objectStore or provide it in constructor!');

			// if (template != null || template != undefined)
			// 	this.template = template;
			// if (this.template == null || this.template == undefined)
			// 	throw new Error('Must have: template! Define property template or provide it in constructor!');

			// this.model.on('invalid', function(model, error){
			// 	this.$el('#spanMessage').addClass('alert alert-error');
			// 	this.$el('#spanMessage').html('Ow boy! Validation failed! More details: <strong>' + model.validationError + '</strong>').fadeIn().delay(5000).fadeOut();
			// });

			// this.bindView = new BidingView({
			// 	el: this.$el.find('#divRegister')
			// 	, model: this.model
			// });
		}

		/*
		 * Need $el rendered before instantiate BindingView. Therefore, this logic works only inside onRender() and onShow().
		 * By convention, will use onShow() to instantiate BindingView and use onReder() to configure custom behavior.
		 * By the way, is possible to use RegisterView.prototype.onShow.call(this, args) to call the super behavior.
		 */
		// , onRender: function(){console.log('Not specific logic implemented here. Make your own implementation!');}
		// , onShow: function() {
		// 	this.bindView = new BidingView({
		// 		el: this.$el.find('#divRegister')
		// 		, model: this.model
		// 	});
		// }

		// , persist: function(ev) {
		// 	ev.preventDefault();

		// 	var self = this;
		// 	var objectStore = App.indexedDB.db.transaction([this.objectStore], 'readwrite').objectStore(this.objectStore);
		// 	var request = (this.model.get('id') == undefined) ? objectStore.add(this.model.toJSON()) : objectStore.put(this.model.toJSON());

		// 	request.onsuccess = function(e) {
		// 		self.$el.find('#spanMessage').addClass('alert alert-success');
		// 		self.$el.find('#spanMessage').html('Data was saved successfully!').fadeIn().delay(5000).fadeOut();
		// 	};

		// 	request.onerror = function(e) {
		// 		console.error(e.srcElement.error.message);
		// 		self.$el.find('#spanMessage').addClass('alert alert-error');
		// 		self.$el.find('#spanMessage').html('Ow boy! We got a error.. <strong>' + e.srcElement.error.message + '</strong>').fadeIn().delay(5000).fadeOut();
		// 	};
		// }

		, saveOnCloud: function(ev) {
			ev.preventDefault();

			var cloud = new Firebase('https://jamesapp.firebaseIO.com');
			cloud.set({
				expenses: this.expenses
				, foods: this.foods
				, groceries: this.groceries
				, gyms: this.gyms
				, motorcycles: this.motorcycles
				, timesheets: this.timesheets
				, configurations: this.configurations
			});

			this.$el.find('#spanMessage').addClass('alert alert-success');
			this.$el.find('#spanMessage').html('Data was saved on cloud successfully!').fadeIn().delay(5000).fadeOut();
		}
		, syncWithCloud: function(ev) {
			ev.preventDefault();

			// TODO sync with firebase
		}

		, saveOnDisk: function(ev) {
			ev.preventDefault();

			// TODO save on disk
		}
		, syncWithDisk: function(ev) {
			ev.preventDefault();

			// TODO sync with disk
		}

	});

	return ItemView;
});
