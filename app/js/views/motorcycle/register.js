define([
	'marionette'
	, 'underscore'
	, 'app'
	, 'config'
	, 'views/register'
	, 'jquerymask'
	, 'jqueryui'
], function (Marionette, _, App, Config, RegisterView) {
	var ItemView = RegisterView.extend({
		template: 'app/templates/motorcycle/register.tpl'
		, objectStore: 'motorcycles'
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
			this.$el.find('#inputDate').datepicker(Config.datePickerConf);
			this.$el.find('#inputDate').datepicker('option', 'yearRange', Config.datePickerConf.yearRange);
			this.$el.find('#inputAmmount').mask('###00,00', {reverse: true});
		}
	});

	return ItemView;
});
