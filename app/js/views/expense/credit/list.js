define([
	'underscore'
	, 'marionette'
	, 'models/expense'
	, 'views/list'
], function (_, Marionette, ExpenseModel, ListView) {

	var ItemView = Marionette.ItemView.extend({
		tagName: function() {
			return "tr id='row" + this.options.entity.value + this.model.get("id") + "'";
		}
		, initialize: function(params) {
			// switch (params.entity) {
            // case Utils.Turma.INSTRUTOR:
			// 	this.template = InstrutorItemTemplate;
            //     break;
            // }
		}
	});

	var CompositeView = Marionette.CompositeView.extend({
		itemView: ItemView
        , tagName: 'div'
		, events: {
			"click .delete-instrutor": "destroy",
			"click #btnChooseInstrutor": "choose"
		}
        , initialize: function(turma, entity) {
            this.model = turma;
			this.itemViewOptions = {entity: entity};
			if (turma.id != undefined) {
				switch (entity) {
				case Utils.Turma.INSTRUTOR:
					this.collection = new CollectionInstrutor({turma: turma.toJSON()});
					this.collection.fetch({async: false});
					this.template = InstrutorCompositeTemplate;
					this.itemViewContainer = "#tbodyItemInstrutorList";
					break;
				}
			}
        }
    });

	// var baseCredit = Marionette.ItemView.extend({
    //     template: TurmaAlunoTemplate
    //     , tagName: 'div'
    //     , initialize: function(turma, entityType) {
	// 		this.entityType = entityType;

	// 		var headerAction = $('<div />').html("A&ccedil;&atilde;o").text();
	// 		var labelMatricula = $('<div />').html("Matr&iacute;cula").text();
	// 		var headerSituacao = $('<div />').html("Situa&ccedil;&atilde;o").text();

	// 		var customCellValue = new Object();
	// 		customCellValue.getButtons = function(idCurso, idTreinamento, idTurma, idAluno) {
	// 			return '<a href="#certificado/curso/' + idCurso + '/treinamento/' + idTreinamento + '/turma/' + idTurma + '/aluno/' + idAluno + '" id="btnDetail" type="submit" class="btn btn-info"><i class="icon-edit icon-white"></i> Detalhes</a>' +
	// 				'&nbsp;' +
	// 				'<a href="#" data-value="' + idAluno + '" type="submit" class="btn btn-danger delete-aluno"><i class="icon-trash icon-white"></i> Excluir</a>';
	// 		};

	// 		var cellAction = Backgrid.Cell.extend({
	// 			render: function () {
	// 				var idCurso = this.model.get('turma').treinamento.curso.id;
	// 				var idTreinamento = this.model.get('turma').treinamento.id;
	// 				var idTurma = this.model.get('turma').id;
	// 				var idAluno = this.model.get('id');
	// 				this.$el.html(customCellValue.getButtons(idCurso, idTreinamento, idTurma, idAluno));
	// 				this.delegateEvents();
	// 				return this;
	// 			}
	// 		});
	// 		var cellMatricula = Backgrid.Cell.extend({
	// 			render: function () {
	// 				var matricula = this.model.get("matricula");
	// 				this.$el.html((matricula != null) ? matricula : '<span class="label label-warning">N&Atilde;O FUNCION&Aacute;RIO PMS</span>');
	// 				this.delegateEvents();
	// 				return this;
	// 			}
	// 		});
	// 		var cellSituacao = Backgrid.Cell.extend({
	// 			render: function () {
	// 				this.$el.html('<span class="label label-info">' + this.model.get("situacaoAluno").descricao + '</span>');
	// 				this.delegateEvents();
	// 				return this;
	// 			}
	// 		});

	// 		var columns = [
	// 			{
	// 				name: 'nome'
	// 				, label: 'Aluno'
	// 				, cell: 'string'
	// 				, editable: false
	// 			}
	// 			, {
	// 				name: 'cpf'
	// 				, label: 'CPF'
	// 				, cell: 'string'
	// 				, editable: false
	// 			}
	// 			, {
	// 				name: 'matricula'
	// 				, label: labelMatricula
	// 				, cell: cellMatricula
	// 				, editable: false
	// 			}
	// 			, {
	// 				name: 'situacaoAluno'
	// 				, label: headerSituacao
	// 				, cell: cellSituacao
	// 				, editable: false
	// 			}
	// 			, {
	// 				name: "acao"
	// 				, editable: false
	// 				, sortable: false
	// 				, label: headerAction
	// 				, cell: cellAction
	// 			}
	// 		];

	// 		this.model = turma;
	// 		this.collection = new CollectionAluno((turma != null) ? turma.toJSON() : undefined, null);
	// 		this.collection.fetch({async: false});

	// 		this.gridView = new Backgrid.Grid({
	// 			columns: columns
	// 			, collection: this.collection
	// 			, className: 'table table-striped table-bordered table-hover'
	// 		});
	// 		this.backgridFilter = new Backgrid.Extension.ClientSideFilter({
	// 			collection: this.collection
	// 			, placeholder: 'Por nome ou CPF ou ' + labelMatricula + '.'
	// 			, fields: ['nome', 'cpf', 'matricula']
	// 		});
	// 		this.backgridPaginator = new Backgrid.Extension.Paginator({
	// 			collection: this.collection
	// 		});
	// 		this.collection.getFirstPage();
    //     }
	// 	, onRender: function() {
	// 		this.$el.find("#divBackgrid").append(this.backgridFilter.render().$el);
	// 		this.$el.find("#divBackgrid").append(this.gridView.render().$el);
	// 		this.$el.find("#divBackgrid").append(this.backgridPaginator.render().$el);
	// 	}
	// 	, events : {
	// 		"focus input[type=text]": "query"
	// 		, "click .delete-aluno": "destroy"
	// 	}
	// 	, query: function(ev) {
	// 		this.collection.fetch({reset: true});
	// 	}

	// 	, destroy: function(ev) {
	// 		ev.preventDefault();

	// 		var self = this;
	// 		var id = parseInt(ev.currentTarget.getAttribute('data-value'));
	// 		this.collection.fetch({async: false});
	// 		var entity = this.collection.where({id: id})[0];

	// 		App.showModal(new TurmaEntityDestroyView({
	// 			entityType: this.entityType
	// 			, callback: function(authorized) {
	// 				if (authorized) {
	// 					entity.destroy({
	// 						success: function(model, response, options) {
	// 							console.log(response);
	// 							self.collection.remove(self.collection.findWhere({id: id}));
	// 						}
	// 						, error: function(model, xhr, options) {
	// 							console.error('[Treinamento#register] Failed to delete treinamentoCusto. Details below: ');
	// 							console.error(model);
	// 							console.error(xhr);
	// 							console.error(options);
	// 						}
	// 					});
	// 				}
	// 			}
	// 		}));
	// 	}
	// });

	// var TurmaView = Marionette.ItemView.extend({
    //     isProtected: App.getConfig().isProtected
	// 	, permission: 'TURMA_ALTERAR'
	// 	, template: RegisterTurmaTemplate
    //     , tagName: 'div'
	// 	, events: {
	// 		'click #btnChooseTreinamento': 'choose'
	// 		, 'click #selectLocalRealizacao': 'defineLocalRealizacao'
	// 		, 'click .btn-primary': function(ev) {(!this.model.isValid()) ? ev.preventDefault() : this.model.save();}
	// 	}
    //     , initialize: function(entity) {
    //         this.model = entity;

	// 		if (this.model.get('id') == undefined)
	// 			this.permission = 'TURMA_INCLUIR';

	// 		this.model.on('invalid', function(model, error) {
	// 			$('#spanMessage').addClass('alert alert-error');
    //             $('#spanMessage').html('Falha ao salvar turma. O(s) seguinte(s) erro(s) foi(ram) encontrado(s): ' + model.validationError).fadeIn().delay(5000).fadeOut();
	// 		});
	// 	}
	// 	, onRender: function(ev) {
	// 		this.$el.find('#inputDataInicio').datepicker(Config.datePickerConf);
	// 		this.$el.find('#inputDataFim').datepicker(Config.datePickerConf);
	// 	}

	// 	, choose: function(ev) {
	// 		ev.preventDefault();

	// 		var self = this,
	// 			entityType = Utils.Turma.get(ev.currentTarget.getAttribute('data-target-entity'))
	// 		;
	// 		App.showModal(new ChooseView({
	// 			entityType: entityType
	// 			, curso: this.model.get('treinamento').curso
	// 			, callback: function (choosenOne) {
	// 				$(ev.currentTarget.getAttribute('data-target-text')).text(choosenOne.text);
	// 				self.model.set(entityType.value, choosenOne.object);
	// 			}
	// 		}));
	// 	}
	// 	, defineLocalRealizacao: function(ev) {
	// 		ev.preventDefault();

	// 		if (ev.currentTarget.value == 'Outros') {
	// 			$('#inputLocalRealizacao').val('');
	// 			$('#inputLocalRealizacao').attr('type', 'text');

	// 			this.model.set('localRealizacao', '');
	// 		} else {
	// 			$('#inputLocalRealizacao').val(ev.currentTarget.value);
	// 			$('#inputLocalRealizacao').attr('type', 'hidden');

	// 			this.model.set('localRealizacao', ev.currentTarget.value);
	// 		}
	// 	}
	// });

	var LayoutView = Marionette.Layout.extend({
        tagName: 'div',
        className: 'box',
        template: RegisterTemplate,
        regions: {
            regionTurma: "#regionTurma",
            regionAluno: "#regionAluno",
            regionInstrutor: "#regionInstrutor"
        },

		initialize: function(turma) {
			this.model = turma;
		},

        onRender: function() {
			this.regionTurma.show(new TurmaView(this.model));
			if (this.model.get('id') != undefined) {
				this.regionAluno.show(new baseCredit(this.model, Utils.Turma.ALUNO));
				this.regionInstrutor.show(new CompositeView(this.model, Utils.Turma.INSTRUTOR));
			}
			console.debug(this.model);
			this.bindView = new BindingView({
				el: $(this.el).find('#frmRegister')
				, model: this.model
			});
        }
    });

    return LayoutView;
});
