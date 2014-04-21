define([
		'backbone'
		, 'app'
], function (Backbone, App) {
		var MemeModel = Backbone.Model.extend({
				defaults: {
						id: 10,
						path: "app/img/memes/",
						extension: "png"
				}
		});

		return MemeModel;
});
