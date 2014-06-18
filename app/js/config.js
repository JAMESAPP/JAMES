define([
],function() {
	var config = {
		"env": 'local'
		, "app": 'yaew'
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
		, 'isProtected': false
		, 'timesheet':{
			id: 1
			, startTime: '08:00'
			, endTime: '14:00'
		}
	};
	return config;
});
