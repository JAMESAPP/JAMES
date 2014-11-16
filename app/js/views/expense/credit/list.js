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

	var LayoutView = Marionette.Layout.extend({
        tagName: 'div',
        className: 'box',
        template: 'app/templates/expense/credit/list.tpl',
        regions: {
            regionOwner: '#regionOwner',
            regionCredit: '#regiionCredit'
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
			// console.debug(this.model);
			this.bindView = new BindingView({
				el: $(this.el).find('#frmRegister')
				, model: this.model
			});
        }
    });

    return LayoutView;
});
