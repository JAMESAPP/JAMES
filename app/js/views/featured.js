define([
		'marionette'
		, 'app'
		, 'collections/featured'
		, 'text!../../templates/featuredCarousel.tpl'
		, 'text!../../templates/featured.tpl'
], function (Marionette, App, FeaturedCollection, ItemViewTemplate, CompositeViewTemplate){
		var itemView = Marionette.ItemView.extend({
				template: ItemViewTemplate,
				tagName: 'div',
				className: function() {

						if (this.model.get("active") == true)
								return "item active";

						return "item";
				}
		});

		var CompositeView = Marionette.CompositeView.extend({
				template: CompositeViewTemplate,
				tagName: 'div',
				className: 'box',
				collection: new FeaturedCollection(),
				itemView: itemView,
				itemViewContainer: '#featuredCarousel',
		});

		return CompositeView;
});
