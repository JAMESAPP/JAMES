define([
		'jquery'
		, 'marionette'
		, 'app'
		, 'text!../../../templates/marionette/itemView.tpl'
		, 'models/meme'
], function ($, Marionette, App, ItemViewTemplate, MemeModel){
		var ItemView = Marionette.ItemView.extend({
				template: ItemViewTemplate,
				tagName: 'div',
				className: 'box',
				model: new MemeModel()
		});

		return ItemView;
});
