define([
		'backbone'
		, 'app'
		, 'views/marionette/itemView'
		, 'views/marionette/compositeView'
		, 'views/marionette/collectionView'
], function (Backbone, App, ItemView, CompositeView, CollectionView) {
		var MarionetteController = Backbone.Router.extend({
				routes: {
						'marionette/itemView': 'itemView',
						'marionette/compositeView': 'compositeView',
						'marionette/collectionView': 'collectionView'
				},

				itemView: function() {
						App.mainRegion.show(new ItemView());
				},

				compositeView: function() {
						App.mainRegion.show(new CompositeView());
				},

				collectionView: function() {
						App.mainRegion.show(new CollectionView());
				}
		});

		return MarionetteController;
});
