define([
	'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: {
			date: App.dateFormat(new Date())
			, KM: 0.0
			, price: 0.00
			, amount: 1
			, observation: null
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';

			if (attr.KM == '')
				return 'KM can\'t be empty!';

			if (attr.price == '')
				return 'Price can\'t be empty!';

			if (attr.amount == '')
				return 'Amount can\'t be empty!';

			if (attr.observation == '')
				return 'Observation can\'t be empty!';
		}
    });

    return Model;
});
