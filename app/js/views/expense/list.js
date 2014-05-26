define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'config'
	, 'collections/categories'
	, 'views/list'
	, 'text!../../../templates/expense/list.tpl'
], function (Marionette, _, App, Config, CategoriesCollection, ListView, Template) {
	var ItemView = ListView.extend({
		template: Template
		, objectStore: 'expenses'
		, serializeData: function() {
			var attrToView = _.clone(this.attributes);

			// var categoriesCollection = new CategoriesCollection();
			// categoriesCollection.fetch({async: false});
			// attrToView.selectCategory = categoriesCollection.toJSON();

			// if (attrToView.id != undefined) {
			// 	attrToView.selectCategory.unshift(attrToView.category);
			// }

			return attrToView;
		}
	});

	return ItemView;
});
