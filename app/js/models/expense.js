define([
    'backbone'
    , 'app'
], function (Backbone, App) {
    var ExpenseModel = Backbone.Model.extend({
		defaults: {
			date: null
			, ammount: 0.00
			, payee: null
			, category: null
			, memo: null
		}

		, initialize: function(params) {
			this.url = App.getBaseURL() + 'expense/';
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';

			if (attr.ammount == '')
				return 'Ammount can\'t be empty!';

			if (attr.payee == '')
				return 'Payee can\'t be empty!';

			if (attr.category == '')
				return 'Category can\'t be empty!';

			if (attr.memo == '')
				return 'Memo can\'t be empty!';
		}
    });

    return ExpenseModel;
});
