define([
    'backbone'
    , 'app'
], function (Backbone, App) {
    var GenericModel = Backbone.Model.extend({

	initialize: function(params) {
	    this.url = App.getBaseURL() + "generic/";
	}
    });

    return GenericModel;
});
