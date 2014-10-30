define([
	'jquery'
	, 'backbone'
	, 'app'
], function ($, Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: function() {
			var secrets;
			try {
				secrets = JSON.parse(this.getSecrets());
			} catch(exception) {
				console.error('Error with JSON.parse(this.getSecrets())');
				console.error(exception);

				secrets = undefined;
			}

			return {
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
					, timesheetBackendURL: (secrets && typeof secrets === 'object') ? secrets.timesheet.timesheetBackendURL : 'BACKEND_HERE'
				}
				, cloudAuth: {
					email: (secrets && typeof secrets === 'object') ? secrets.cloudAuth.email : '<YOUR_EMAIL_HERE>@<SOME_DOMAIN>'
					, password: (secrets && typeof secrets === 'object') ? secrets.cloudAuth.password : '<YOUR_PASSWORD_HERE>'
				}
				, motorcycle: {
					KM: 0.0
				}
			};
		}

		/**
		 * It's a pain in... to always type configuration data that's secret (e.g.: password).
		 * So, instead of type, I saved it in app/data/secrets.json and add it to .gitignore.
		 * *Be careful* to not send this file with a public build of this app.
		 * By the way, I added the file secrets.json.example with instructions.
		 * Add your own data and save as secrets.json
		 * Again: *be careful* (very) to not add it with a public build. It would be sad. Very sad. :'(
		 *
		 */
		, getSecrets: function(file) {
			if (file == undefined)
				file = 'app/data/secrets.json';

			return $.ajax({
				type: 'GET',
				url: file,
				async: false
			}).responseText;
		}

		, getInfo: function(onSuccess) {
			var settings,
				objectStore = App.indexedDB.db.transaction(['settings'], 'readonly').objectStore('settings').get(1)
			;
			objectStore.onsuccess = onSuccess;
		}
    });

    return Model;
});
