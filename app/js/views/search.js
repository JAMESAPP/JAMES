define([
    'jquery'
    , 'backbone'
    , 'app'
], function ($, Backbone, App) {
    var SearchView = Backbone.View.extend({
	tagName: 'div',
	className: 'box',
	cpf: '',

	initialize: function(params) {
	    this.cpf = params.cpf;
	},

	render: function() {
	    // var person = new YAWECAPP.PersonManagementModel({cpf: this.cpf});
	    // person.fetch({async: false});

	    // var temp = person.get("dateConfirmation")['$'].split(' ');
	    // var dateConfirmation = temp[0].split('-');
	    // dateConfirmation = dateConfirmation[2] + "/" + dateConfirmation[1] + "/" + dateConfirmation[0];
	    // var time = temp[1].split('.');

	    // person.set("date", dateConfirmation);
	    // person.set("time", time[0]);

	    // var template = Mark.up(YAWECAPP.getTemplate("person/search"), person.toJSON());

            // $(this.el).html( template );
            return this;
	}
    });

    return SearchView;
});
