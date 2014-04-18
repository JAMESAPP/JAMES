define([
		'marionette'
		, 'app'
		, 'collections/meme'
		, 'text!../../../templates/marionette/compositeItemView.tpl'
		, 'text!../../../templates/marionette/compositeView.tpl'
], function (Marionette, App, MemeCollection, ItemViewTemplate, CompositeViewTemplate){
		var itemView = Marionette.ItemView.extend({
				template: ItemViewTemplate,
				tagName: 'tr'
		});

		var CompositeView = Marionette.CompositeView.extend({
				template: CompositeViewTemplate,
				itemView: itemView,
				itemViewContainer: '#tbodyItem',
				className: 'box',
				tagName: 'div',
				collection: new MemeCollection()
		});

		return CompositeView;
});
