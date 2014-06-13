define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'config'
	, 'collections/categories'
	, 'views/register'
	, 'text!../../../templates/motorcycle/register.tpl'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, Config, CategoriesCollection, RegisterView, Template) {
	var ItemView = RegisterView.extend({
		template: Template
		, objectStore: 'motorcycles'
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