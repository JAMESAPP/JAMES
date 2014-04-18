define([
		'jquery'
		, 'backbone'
		, 'underscore'
		, 'app'
], function ($, Backbone, _, App) {
		var UserModel = Backbone.Model.extend({

				defaults: {
						validCPF: false,
						validPassword: false
				},

				isValidPassword: function(password, retype) {
						var status = true;
						var template = '<div class="alert alert-info">Valida&ccedil;&atilde;o da senha efetuada com sucesso!</div>';
						var minimalLength = 6;

						// retype is correct
						if (password != retype) {
								template = '<div class="alert alert-warning">Senha digitada/confirma&ccedil;&atilde;o n&atilde;o conferem!</div>';
								status = false;
						}

						// is empty?
						if ( _.isEmpty(password)) {
								template = '<div class="alert alert-warning">Senha inv&iacute;lida: vazio.</div>';
								status = false;
						}

						// is in range (have minimal length)?
						if (password.length < minimalLength) {
								template = '<div class="alert alert-warning">Tamanho da senha inv&aacute;lido. A senha deve conter no m&iacute;nimo 6 caracteres.</div>';
								status = false;
						}

						$('#divPasswordMessage').html(template);
						this.validPassword = status;
						return status;
				},

				isValidCPF: function(cpf) {
						var status = true;

						// FIXME "" not working!
						if (_.isEmpty(cpf)) {
								console.log("Empty cpf!");
								status = false;
						}

						// Don't need query backend to know that CPF doesn't exist!
						if (cpf.length != 11) {
								console.log("CPF length != 11");
								status = false;
						}

						// var isNumeric = /^[0-9]+$/.test(cpf);
						if (isNaN(cpf)) {
								console.log("CPF not numeric!");
								var anArray = cpf.split('');
								var result = "";
								for (var i = 0; i <= anArray.length; i++) {
										var isNumeric = !isNaN(anArray[i]); // not not a number <=> a number
										if (isNumeric)
												result += anArray[i];
								}
								$('#inputSearch').val(result);

								status = false;
						}

						// validation rule
						// value = jQuery.trim(value);

						//			value = value.replace('.','');
						//			value = value.replace('.','');
						//			cpf = value.replace('-','');
						//			while(cpf.length < 11) cpf = "0"+ cpf;
						//			var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
						//			var a = [];
						//			var b = new Number;
						//			var c = 11;
						//			for (i=0; i<11; i++){
						//				a[i] = cpf.charAt(i);
						//				if (i < 9) b += (a[i] * --c);
						//			}
						//			if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
						//			b = 0;
						//			c = 11;
						//			for (y=0; y<10; y++) b += (a[y] * c--);
						//					if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }

						//					var retorno = true;
						//					if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;

						//					return this.optional(element) || retorno;

						this.validCPF = status;
						return status;
				}
		});

		return UserModel;
});
