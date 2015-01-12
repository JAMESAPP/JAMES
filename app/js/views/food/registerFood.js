define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'collections/foodGroups'
	, 'views/register'
	, 'models/setting'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, FoodGroupCollection, RegisterView, SettingModel) {
	var ItemView = RegisterView.extend({
		template: 'app/templates/food/registerFood.tpl'
		, objectStore: 'foods'
		, serializeData: function() {
			var attrToView = _.clone(this.attributes);

			var foodGroupCollection = new FoodGroupCollection();
			foodGroupCollection.fetch({async: false});
			attrToView.selectFoodGroups = foodGroupCollection.toJSON();

			if (attrToView.id != undefined) {
				attrToView.selectFoodGroups.unshift(attrToView.food);
			}

			return attrToView;
		}
		, onRender: function() {
			// var self = this;
			// App.indexedDB.db.transaction(['settings'], 'readonly').objectStore('settings').get(1).onsuccess = function(event) {
			// 	self.$el.find('#inputDate').datepicker(event.target.result.datePickerConf);
			// 	self.$el.find('#inputDate').datepicker('option', 'yearRange', event.target.result.datePickerConf.yearRange);
			// };
			var self = this,
				setting = new SettingModel(),
				conf = setting.defaults()
			;
			setting.getInfo(function(event) {
				if (event.target.result != undefined)
					conf = event.target.result;

				self.$el.find('#inputDate').datepicker(conf.datePickerConf);
				self.$el.find('#inputDate').datepicker('option', 'yearRange', conf.datePickerConf.yearRange);
			});
		}
	});

	return ItemView;
});
