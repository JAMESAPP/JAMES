define([
    'jquery'
    , 'backbone'
    ,'app'
    , 'models/user'
], function ($, Backbone, App, UserModel){
    var PasswordView = Backbone.View.extend({
	tagName: 'div',
	className: 'box',

	personManagementModel: null,
	passwordModel: null,
	
	initialize: function() {
	    this.passwordModel = new UserModel();
	},
	
	render: function(tpl) {
	    console.log('update password view');

	    if (tpl == undefined)
		this.navigate("error", {trigger: true});

            var template = Mark.up(App.getTemplate(tpl));

            $(this.el).html( template );

	    // FIXME just F5 (reload) works... why?
	    $(document).ready(function() {
		$("#inputSearch").focus();
	    });

            return this;
	},

	events: {
	    'click #btnSearch': 'search',
	    'keyup #inputSearch': 'search',
	    'click #btnAction': 'updatePassword',
	    'keyup #inputPassword': 'validatePassword',
	    'keyup #inputRetype': 'validatePassword'
	},

	// TODO move it to PersonManagement model.
	search: function(ev) {
	    ev.preventDefault();

	    var cpf = $('#inputSearch').val();
	    var template;

	    if (!this.passwordModel.isValidCPF(cpf)){
		console.log('Falha na validacao do CPF!');
		template = '<div class="alert alert-warning">Falha na valida&ccedil;&atilde;o do CPF.</div>';
		// this.passwordModel.validCPF = false;
	    } else {

		var person = new YAWECAPP.PersonManagementModel({cpf: cpf});
		person.fetch({async: false});

		// message happen when person is not found in DB.
		if (!person.get("message")) {
		    var temp = person.get("dateConfirmation")['$'].split(' ');
		    var dateConfirmation = temp[0].split('-');
		    dateConfirmation = dateConfirmation[2] + "/" + dateConfirmation[1] + "/" + dateConfirmation[0];
		    var time = temp[1].split('.');

		    person.set("date", dateConfirmation);
		    person.set("time", time[0]);

		    template = Mark.up(YAWECAPP.getTemplate("person/search"), person.toJSON());

		    // this must be moved with search person.
		    this.passwordModel.validCPF = true;
		} else {
		    template = '<div class="alert alert-warning">' + person.get("message") + '</div>';
		    // this must be moved with search person.
		    this.passwordModel.validCPF = false;
		}
	    }

            $('#divSearch').html( template );
	    this.enableAction();
	},

	validatePassword: function(ev) {
	    ev.preventDefault();
	    var password = $('#inputPassword').val();
	    var retype = $('#inputRetype').val();

	    this.passwordModel.isValidPassword(password, retype);

	    this.enableAction();
	},

	// Main action of page.
	updatePassword: function(ev) {
	    ev.preventDefault();

	    var cpf = $('#inputSearch').val();
	    var validCPF = this.passwordModel.isValidCPF(cpf);

	    var password = $('#inputPassword').val();
	    var retype = $('#inputRetype').val();
	    var validPassword = this.passwordModel.isValidPassword(password, retype);

	    if(validPassword || validCPF) {
		that = this;
		var dataToSend = {cpf: cpf, newPassword: password};
		$.ajax({
		    type: 'POST',
		    url: YAWECAPP.getBaseURL() + 'pessoa/atualizarSenha',
		    data: dataToSend,
		    dataType: 'json',
		    cache: false,
		    success: function(data) {
			if (data.status) {
			    that.$('#divAction-success').addClass('alert alert-success');
			    that.$('#divAction-success').html('Senha Atualizada com sucesso!').fadeIn().delay(2000).fadeOut();
			} else {
			    that.$('#divAction-error').addClass('alert alert-error');
			    that.$('#divAction-error').html(data.message).fadeIn().delay(2000).fadeOut();
			}
		    },
		    error: function(data) {
			console.log('Bad bad server...! Response is not 200!!');
			that.$('#divAction-error').addClass('alert alert-error');
			that.$('#divAction-error').html("Erro: Falha na comunica&ccedil;&atilde;o com o server. Contate a equipe de inform&aacute;tica da PMS.").fadeIn().delay(2000).fadeOut();
		    }
		});
	    }
	},

	// Listener for state of validation.
	enableAction: function() {
	    var foundPerson = this.passwordModel.validCPF;
	    var validPassword = this.passwordModel.validPassword;

	    if (!foundPerson || !validPassword) {
		$("#btnAction").attr("disabled", "disabled");
		return;
	    }

	    $("#btnAction").removeAttr("disabled");
	}
    });

    return PasswordView;
});
