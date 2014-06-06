define([
	'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: {
			date: null
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';
		}
    });

    return Model;
});
