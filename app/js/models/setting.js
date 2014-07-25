define([
	'backbone'
], function (Backbone) {
    var Model = Backbone.Model.extend({
		defaults: {
			id: 1
			, env: 'local'
			, app: 'james'
			, backend: 'backend'
			, datePickerConf: {
				dateFormat: 'dd/mm/yy',
				dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
				dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
				dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
				monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
				monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
				nextText: 'Próximo',
				prevText: 'Anterior',
				changeMonth: true,
				changeYear: true,
				yearRange: (new Date().getFullYear() - 100) + ':' + (new Date().getFullYear() + 100)
			}
			, isProtected: false
			, timesheet: {
				id: 1 // FIXME is used?
				, startTime: '08:00'
				, endTime: '14:00'
				, workload: '06:00'
			}
			, cloudAuth: {
				email: '<YOUR_EMAIL_HERE>@<SOME_DOMAIN>'
				, password: '<YOUR_PASSWORD_HERE>'
			}
		}

		// TODO implement it!
		// , validade: function(attr, options) {
		// 	if (attr.date == '')
		// 		return 'Date can\'t be empty';

		// 	if (attr.ammount == '')
		// 		return 'Ammount can\'t be empty!';

		// 	if (attr.category == '')
		// 		return 'Category can\'t be empty!';

		// 	if (attr.memo == '')
		// 		return 'Memo can\'t be empty!';
		// }
    });

    return Model;
});
