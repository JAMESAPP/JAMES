define([
	'underscore'
    , 'backbone'
    , 'app'
], function (_, Backbone, App) {
    var ExpenseModel = Backbone.Model.extend({
		defaults: {
			id: null
			, date: null
			, ammount: 0.00
			, category: null
			, memo: null
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';

			if (attr.ammount == '')
				return 'Ammount can\'t be empty!';

			if (attr.category == '')
				return 'Category can\'t be empty!';

			if (attr.memo == '')
				return 'Memo can\'t be empty!';
		}
    });

    return ExpenseModel;
});
