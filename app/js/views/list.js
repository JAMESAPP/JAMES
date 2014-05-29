define([
	'marionette'
	, 'app'
], function (Marionette, App) {
	var ListView = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'box'
		, events: {
			'click .btn-primary': 'detail'
			, 'click .btn-danger': 'delete'
		}
		, template: undefined
		, objectStore: undefined
		, column: undefined

		/*
		 * Must implement:
		 *
		 * columns: merge id, action and custom
		 * model
		 * collection
		 * 
		 */
		, initialize: function(collection, model) {

			// var actionCellValue = {};
			// actionCellValue.getButtons = function(id) {
			// 	return '<a href="#' + this.objectStore + '/' + id + '" class="btn btn-primary">Detail</a>' +
			// 		' &nbsp;' +
			// 		'<a href="#expense/' + id + '" class="btn btn-danger">Delete</a>';
			// };

			// var cellAction = Backgrid.Cell.extend({
			// 	render: function () {
			// 		this.$el.html(actionCellValue.getButtons(this.model.get('id')));
			// 		this.delegateEvents();
			// 		return this;
			// 	}
			// });

			// var columns = [
			// 	{
			// 		name: "instituicao"
			// 		, label: labelInstituicao
			// 		, editable: false
			// 		, cell: cellInstituicao
			// 	}
			// 	, {
			// 		name: "unidadeSolicitante"
			// 		, label: "Unidade Solicitante"
			// 		, editable: false
			// 		, cell: cellUnidadeSolicitante
			// 	}
			// 	, {
			// 		name: "descricao"
			// 		, label: descricao
			// 		, editable: false
			// 		, cell: "string"
			// 	}
			// 	, {
			// 		name: 'action'
			// 		, editable: false
			// 		, sortable: false
			// 		, label: 'Action'
			// 		, cell: cellAction
			// 	}
			// ];

			// // this.collection = new Collection((curso != null) ? curso.toJSON() : undefined, null);
			// // this.collection.fetch({async: false});

			// this.model = entity;
			// this.collection = new Collection(entities);
			

			// this.gridView = new Backgrid.Grid({
			// 	columns: this.columns
			// 	, collection: this.collection
			// 	, className: 'table table-striped table-bordered table-hover'
			// });
			// this.backgridFilter = new Backgrid.Extension.ClientSideFilter({
			// 	collection: this.collection
			// 	, placeholder: this.placeHolder
			// 	, fields: this.fields
			// });
			// this.backgridPaginator = new Backgrid.Extension.Paginator({
			// 	collection: this.collection
			// });
			// this.collection.getFirstPage();
        }
		// , onRender: function() {
		// 	this.$el.find("#divBackgrid").append(this.backgridFilter.render().$el);
		// 	this.$el.find("#divBackgrid").append(this.gridView.render().$el);
		// 	this.$el.find("#divBackgrid").append(this.backgridPaginator.render().$el);
		// }
		// , events : {
		// 	"focus input[type=text]": "query"
		// }
		// , query: function(ev) {
		// 	this.collection.fetch({reset: true});
		// }

		, detail: function(ev) {
			ev.preventDefault();
			console.error('Not implemented yet!!');
		}

		, delete: function(ev) {
			ev.preventDefault();
			console.error('Not implemented yet!!');
		}
	});
	// return ListView;

});
