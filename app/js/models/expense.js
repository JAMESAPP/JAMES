define([
    'backbone'
    , 'app'
], function (Backbone, App) {
    var ExpenseModel = Backbone.Model.extend({

		initialize: function(params) {
			this.url = App.getBaseURL() + "generic/";
		}
    });

    return ExpenseModel;
});
