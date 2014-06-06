define([
	'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: {
			date: null
			, ammout: 0.00
			, price: 0.00
			, observation: null
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';

			if (attr.ammount == '')
				return 'Ammount can\'t be empty!';

			if (attr.price == '')
				return 'Price can\'t be empty!';

			if (attr.observation == '')
				return 'Observation can\'t be empty!';
		}
    });

    return Model;
});
