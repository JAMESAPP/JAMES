define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'views/register'
	, 'models/setting'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, RegisterView, SettingModel) {
	var ItemView = RegisterView.extend({
		template: 'app/templates/motorcycle/refuel/register.tpl'
		, objectStore: 'refuels'
		, serializeData: function() {
			var attrToView = _.clone(this.attributes);

			// TODO implement list of gas station

			// var entities = [];
			// App.indexedDB.db.transaction([entity], 'readonly').objectStore(entity).openCursor().onsuccess = function(e) {
			// 	var cursor = e.target.result;
			// 	if (cursor) {
			// 		entities.push(cursor.value);
			// 		cursor.continue();
			// 	} else {
			// 		var collection = new Collection(entities);
			// 		App.mainRegion.show(new View(collection));
			// 	}
			// };

			// var gasStationCollection = new GasStationCollection();
			// gasStationCollection.fetch({async: false});
			// attrToView.selectGasStation = gasStationCollection.toJSON();

			// if (attrToView.id != undefined) {
			// 	attrToView.selectCategory.unshift(attrToView.category);
			// }

			return attrToView;
		}
		, onRender: function() {
			var self = this,
				setting = new SettingModel(),
				conf = setting.defaults()
			;
			setting.getInfo(function(event) {
				if (event.target.result != undefined)
					conf = event.target.result;

				self.$el.find('#inputDate').datepicker(conf.datePickerConf);
				self.$el.find('#inputDate').datepicker('option', 'yearRange', conf.datePickerConf.yearRange);
				self.$el.find('#inputAmmount').mask('###00,00', {reverse: true});
			});
		}
	});

	return ItemView;
});
