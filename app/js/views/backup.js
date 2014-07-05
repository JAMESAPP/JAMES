define([
	'underscore'
	, 'marionette'
	, 'firebase'
	, 'app'
	, 'views/bindingView'
	, 'text!../../templates/backup.tpl'
], function (_, Marionette, Firebase, App, BidingView, Template) {
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

		, initialize: function(expenses, foods,	groceries, gyms, motorcycles, timesheets, configurations) {

			this.jamesData = _.extend({}, expenses, foods, groceries, gyms, motorcycles, timesheets, configurations);
			console.log('james data');
			console.log(this.jamesData);



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
			cloud.set(this.jamesData);
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
