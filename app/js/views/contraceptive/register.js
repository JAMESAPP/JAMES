define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'views/register'
	, 'models/setting'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, RegisterView, SettingModel) {
	var ItemView = RegisterView.extend({
		template: 'app/templates/contraceptive/register.tpl'
		, objectStore: 'contraceptives'
		, events: function() {
			return _.extend({}, RegisterView.prototype.events, {
				'click #btnAskDeleteConfirmation': 'askDeleteConfirmation'
				, 'click #btnDelete': 'delete'
			});
		}
		, onRender: function() {
			var self = this,
				setting = new SettingModel(),
				conf = setting.defaults()
			;
			setting.getInfo(function(event) {
				if (event.target.result != undefined)
					conf = event.target.result;

				self.$el.find('#inputDate').datepicker(conf.datePickerConf);
				self.$el.find('#inputDate').datepicker('option', 'yearRange', conf.datePickerConf.yearRange);
				self.$el.find('#inputCycle').mask('##/####');
			});
		}

		, askDeleteConfirmation: function(ev) {
			ev.preventDefault();

			this.$el.find('#spanMessage').removeClass();
			this.$el.find('#spanMessage').addClass('col-xs-12 text-center alert alert-danger');
			this.$el.find('#spanMessage').html('<span>Really want delete this register?!</span>&nbsp;<a id="btnDelete" href="#" class="btn btn-danger"><i class="icon-white glyphicon glyphicon-trash"></i> Yes!!</a>').fadeIn().delay(5000).fadeOut();
		}

		, delete: function(ev) {
			ev.preventDefault();

			var id = parseInt(this.model.get('id'));
			App.indexedDB.db.transaction([this.objectStore], 'readwrite').objectStore(this.objectStore).delete(id).onsuccess = function(e) {
				window.location.href = '#contraceptives';
			};
		}
	});

	return ItemView;
});
