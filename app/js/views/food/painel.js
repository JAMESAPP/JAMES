define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'collections/foods'
	, 'models/setting'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, FoodCollection, SettingModel) {
	var ItemView = Marionette.ItemView.extend({
		template: 'app/templates/food/painel.tpl'
		, serializeData: function() {
			var attrToView = _.clone(this.attributes);

			// var foodCollection = new FoodCollection();
			// foodCollection.fetch({async: false});
			// attrToView.selectFood = foodCollection.toJSON();

			// if (attrToView.id != undefined) {
			// 	attrToView.selectFood.unshift(attrToView.food);
			// }

			return attrToView;
		}
		, onRender: function() {
			// var self = this,
			// 	setting = new SettingModel(),
			// 	conf = setting.defaults()
			// ;
			// setting.getInfo(function(event) {
			// 	if (event.target.result != undefined)
			// 		conf = event.target.result;

			// 	self.$el.find('#inputDate').datepicker(conf.datePickerConf);
			// 	self.$el.find('#inputDate').datepicker('option', 'yearRange', conf.datePickerConf.yearRange);
			// });
		}

		, caloriesBuget: function(totalCalories, totalExercice) {
			

		}

		, nutrientsBuget: function(ev) {
			ev.preventDefault();
		}
	});

	return ItemView;
});
