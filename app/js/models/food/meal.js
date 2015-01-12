define([
	'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: {
			id: null
			, date: App.dateFormat(new Date())
			, time: App.dateFormat(new Date(), 'HH:mm')
			, type: 'breakfast'
			, foods: []
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';
		}
    });

    return Model;
});
