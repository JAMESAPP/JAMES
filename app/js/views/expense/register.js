define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'config'
	, 'collections/categories'
	, 'views/register'
	, 'text!../../../templates/expense/register.tpl'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, Config, CategoriesCollection, RegisterView, Template) {
	var ItemView = RegisterView.extend({
		template: Template
		, objectStore: 'expenses'
		, serializeData: function() {
			var attrToView = _.clone(this.attributes);

			var categoriesCollection = new CategoriesCollection();
			categoriesCollection.fetch({async: false});
			attrToView.selectCategory = categoriesCollection.toJSON();

			if (attrToView.id != undefined) {
				attrToView.selectCategory.unshift(attrToView.category);

				// TODO clean array...
				// var attr = attrToView;
				// var categoriesIds = _.uniq(_.map(attrToView.selectCategory, function(account) {
				// 	return account.full_name;
				// }));
				// 	var categoriesFiltered = [];
				// 	_.each(categoriesIds, function(full_name) {
				// 		categoriesFiltered.push(_.find(attr.selectCategory, function(account) {
				// 			return account.full_name == full_name;
				// 		}));
				// 	});
				// 	attrToView.selectCategory = categoriesFiltered;
			}

			return attrToView;
		}
		, onRender: function() {
			this.$el.find('#inputDate').datepicker(Config.datePickerConf);
			this.$el.find('#inputDate').datepicker('option', 'yearRange', Config.datePickerConf.yearRange);
			this.$el.find('#inputAmmount').mask('###00,00', {reverse: true});
			// TODO implement integration with epoxy (objectHandler) with category element.
		}
	});

	return ItemView;
});
