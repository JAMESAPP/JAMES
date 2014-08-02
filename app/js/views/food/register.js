define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'config'
	, 'collections/foods'
	, 'views/register'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, Config, FoodCollection, RegisterView) {
	var ItemView = RegisterView.extend({
		template: 'app/templates/food/register.tpl'
		, objectStore: 'foods'
		, serializeData: function() {
			var attrToView = _.clone(this.attributes);

			var foodCollection = new FoodCollection();
			foodCollection.fetch({async: false});
			attrToView.selectFood = foodCollection.toJSON();

			if (attrToView.id != undefined) {
				attrToView.selectFood.unshift(attrToView.food);
			}

			return attrToView;
		}
		, onRender: function() {
			this.$el.find('#inputDate').datepicker(Config.datePickerConf);
			this.$el.find('#inputDate').datepicker('option', 'yearRange', Config.datePickerConf.yearRange);
		}
	});

	return ItemView;
});
