define([
		'marionette'
		, 'app'
		, 'models/meme'
		, 'text!../../templates/error.tpl'

], function (Marionette, App, MemeModel, Template)  {
		var ItemView = Marionette.ItemView.extend({
				template: Template,
				tagName: 'div',
				className: 'box',
				initialize: function() {
						var numberMemes = 10;
						var random = Math.floor((Math.random() * numberMemes) + 1);

						this.model = new MemeModel({id: random});
				}
		});

		return ItemView;
});
