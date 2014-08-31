define([
	'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: {
			id: null
			, name: null
			, group: null
			, calories: 0
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';
		}
    });

    return Model;
});
