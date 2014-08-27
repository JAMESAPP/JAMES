define([
	'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: {
			id: null
			, description: null
			, group: null
			, foods: []
			, points: 0
			, calories: 0
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';
		}
    });

    return Model;
});
