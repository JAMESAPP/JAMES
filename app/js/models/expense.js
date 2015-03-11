define([
	'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: {
			date: null
			, amount: 0.00
			, accountFrom: null
			, accountTo: null
			, memo: null
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';

			if (attr.amount == '')
				return 'Ammount can\'t be empty!';

			if (attr.accountFrom == '')
				return 'Account FROM can\'t be empty!';

			if (attr.accountTo == '')
				return 'Account TO  can\'t be empty!';

			if (attr.memo == '')
				return 'Memo can\'t be empty!';
		}
    });

    return Model;
});
