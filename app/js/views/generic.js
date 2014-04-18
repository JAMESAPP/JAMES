define([
		'marionette'
		, 'app'
], function (Marionette, App)  {
		var ItemView = Marionette.ItemView.extend({
				tagName: 'div',
				className: 'box',

				initialize: function(param) {
						this.template = App.getTemplate(param.tpl);
				}

				// TODO move it to generic model.
				// , search: function(ev) {
				// 		ev.preventDefault();

				// 		var cpf = $('#inputSearch').val();

				// 		var person = new YAWECAPP.PersonManagementModel({cpf: cpf});
				// 		person.fetch({async: false});

				// 		console.log(person);
				// 		var template;
				// 		if (!person.get("message")) {
				// 				var temp = person.get("dateConfirmation")['$'].split(' ');
				// 				var dateConfirmation = temp[0].split('-');
				// 				dateConfirmation = dateConfirmation[2] + "/" + dateConfirmation[1] + "/" + dateConfirmation[0];
				// 				var time = temp[1].split('.');

				// 				person.set("date", dateConfirmation);
				// 				person.set("time", time[0]);

				// 				template = Mark.up(YAWECAPP.getTemplate("person/search"), person.toJSON());
				// 		} else {
				// 				template = '<div class="alert alert-warning">' + person.get("message") + '</div>';
				// 		}
				// 		$('#divSearch').html( template );
				// }		 
		});

		return ItemView;
});
