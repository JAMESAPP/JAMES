define([
	'underscore'
	, 'moment'
	, 'views/calendar'
], function (_, Moment, CalendarView) {
	var calendarView = CalendarView.extend({
		template: 'app/templates/expense/credit/list.tpl'
		, objectStore: 'credits'
		, getEventSource: function() {
			var arr = [],
				el
			;

			_.forEach(this.collection.toJSON(), function(element, index, list) {
				el = {allDay: true};
				el.id = element.id;
				el.start = Moment(element.date, 'DD/MM/YYYY');
				el.title = '$' + element.amount;

				arr.push(el);
			});
			
			return  [
				{
					events: arr,
					backgroundColor: 'red'
				}
			];
		}
	});

	return calendarView;
});


// define([
// 	'underscore'
// 	, 'marionette'
// 	, 'models/expense'
// 	, 'views/list'
// ], function (_, Marionette, ExpenseModel, ListView) {

// 	// TODO must implement tagName
// 	var ItemView = Marionette.ItemView.extend({
// 		// FIXME this.options.entity.value ?!?!
// 		tagName: function() {
// 			return "tr id='row" + this.options.entity.value + this.model.get("id") + "'";
// 		}
// 		, initialize: function(params) {
// 			switch (params) {
// 			case 'owners':
// 				this.template = 'app/templates/expense/credit/list-item-owner.tpl';
// 				break;
// 			case 'credit':
// 				this.template = 'app/templates/expense/credit/list-item-credit.tpl';
// 				break;
// 			}
// 		}
// 	});

// 	// TODO implement:
// 	/*
// 	 * Must implement the follow:
// 	 * - itemView (tagName and template)
// 	 * - template of composite view
// 	 * - Must define objectStore (string)
// 	 */
// 	var CompositeView = Marionette.CompositeView.extend({
// 		itemView: ItemView
// 		, className: 'box'
// 		, tagName: 'div'
// 		, itemViewContainer: '#tbodyItem'
// 		, events: {
// 			"click .btn-danger": "delete"
// 		}
//         , initialize: function(coll, model, objectStore) {
// 			this.collection = coll;
// 			this.model = model;
// 			// this.itemViewOptions = {entity: entity};
// 			// if (turma.id != undefined) {
// 			// 	switch (entity) {
// 			// 	case Utils.Turma.INSTRUTOR:
// 			// 		this.collection = new CollectionInstrutor({turma: turma.toJSON()});
// 			// 		this.collection.fetch({async: false});
// 			// 		this.template = InstrutorCompositeTemplate;
// 			// 		this.itemViewContainer = "#tbodyItemInstrutorList";
// 			// 		break;
// 			// 	}
// 			// }
//         }
// 		// TODO implement it!
// 		, delete: function(ev) {
// 			ev.preventDefault();

// 			console.log('Not implemented yet!');
// 			// var self = this;
// 			// var id = parseInt(ev.currentTarget.getAttribute('id'));
// 			// App.indexedDB.db.transaction([this.objectStore], 'readwrite').objectStore(this.objectStore).delete(id).onsuccess = function(e) {
// 			// 	var model = self.collection.where({id: id});
// 			// 	self.collection.remove(model);
// 			// };
// 		}
//     });

// 	var LayoutView = Marionette.Layout.extend({
//         tagName: 'div',
//         className: 'box',
//         template: 'app/templates/expense/credit/list.tpl',
//         regions: {
//             regionOwner: '#regionOwner',
//             regionCredit: '#regionCredit'
//         },

// 		initialize: function(owners, credits) {
// 			this.owners = owners;
// 			this.credits = credits;
// 			// this.model = turma;
// 		},

//         onRender: function() {
// 			this.regionTurma.show(new TurmaView(this.model));
// 			if (this.model.get('id') != undefined) {
// 				this.regionOwner.show(new baseCredit(this.model, Utils.Turma.ALUNO));
// 				this.regionCredit.show(new CompositeView(this.model, Utils.Turma.INSTRUTOR));
// 			}
// 			// console.debug(this.model);
// 			this.bindView = new BindingView({
// 				el: $(this.el).find('#frmRegister')
// 				, model: this.model
// 			});
//         }
//     });

//     return LayoutView;
// });
