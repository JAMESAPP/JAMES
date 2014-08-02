define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'config'
	, 'collections/categories'
	, 'views/register'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, Config, CategoriesCollection, RegisterView) {
	var ItemView = RegisterView.extend({
		template: 'app/templates/expense/register.tpl'
		, objectStore: 'expenses'
		, serializeData: function() {
			var attrToView = _.clone(this.attributes);

			var categoriesCollection = new CategoriesCollection();
			categoriesCollection.fetch({async: false});
			attrToView.selectCategory = categoriesCollection.toJSON();

			if (attrToView.id != undefined) {
				attrToView.selectCategory.unshift(attrToView.category);
			}

			return attrToView;
		}
		, onRender: function() {
			this.$el.find('#inputDate').datepicker(Config.datePickerConf);
			this.$el.find('#inputDate').datepicker('option', 'yearRange', Config.datePickerConf.yearRange);
			this.$el.find('#inputAmmount').mask('###00,00', {reverse: true});
		}
	});

	return ItemView;
});
