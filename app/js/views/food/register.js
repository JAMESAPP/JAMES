define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'config'
	, 'collections/foods'
	, 'views/register'
	, 'text!../../../templates/food/register.tpl'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, Config, FoodCollection, RegisterView, Template) {
	var ItemView = RegisterView.extend({
		template: Template
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
