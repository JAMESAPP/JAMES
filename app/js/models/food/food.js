define([
	'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: {
			name: null
			, group: null
			, calories: 0
		}

		, validade: function(attr, options) {
			if (attr.name == '')
				return 'Name can\'t be empty';
		}
    });

    return Model;
});
