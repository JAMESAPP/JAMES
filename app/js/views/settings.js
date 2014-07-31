define([
	'underscore'
	, 'marionette'
	, 'app'
	, 'views/bindingView'
	, 'views/register'
	, 'text!../../templates/settings.tpl'
	, 'hideShowPassword'
], function (_, Marionette, App, BidingView, RegisterView, Template) {
	var ItemView = RegisterView.extend({
		tagName: 'div',
		className: 'box'
		, template: Template
		, objectStore: 'settings'
		, events: function() {
			return _.extend({}, RegisterView.prototype.events, {
				'click #btnHideShowPassword': 'hideShowPassword'
				, 'click #btnDeleteSettings': 'deleteSettings'
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
	});

	return ItemView;
});
