define([
	'moment',
	, 'app'
	, 'views/settings'
	, 'models/setting'
	, 'text!../../../../../../../test/data/settings/defaultData.json'
	, 'text!../../../../../../../test/data/settings/persistTest.json'
], function (Moment, App, SettingsView, SettingModel, DefaultData, PersistData) {
	// FIXME it is too hard to test interaction with IndexedDB. Need think about something else.
	return describe('Settings.', function() {
		var settings,
			settingsViewDefaultData = new SettingsView(new SettingModel(JSON.parse(DefaultData))),
			settingsViewPersistData = new SettingsView(new SettingModel(JSON.parse(PersistData)))
		;

		// App.initializeDB();
		// settingsViewPersistData.render();

		describe('Persist.', function() {
			it('Should persist data!', function() {
				// var ev = {};

				// console.log(settingsViewPersistData);
				// console.log(settingsViewPersistData.$el);
				// console.log(settingsViewPersistData.childNodes);
				// console.log(settingsViewPersistData.$el.childNodes[10]);

				// settingsViewPersistData.$el.find('#btnPersist').trigger('click');


				// ev.preventDefault = function() {
				// 	return {};
				// };
				// settingsViewPersistData.persist(ev);

				// var objectStore = App.indexedDB.db.transaction(['settings']).objectStore('settings').get(1);
				// objectStore.onsuccess = function(event) {
				// 	settings = event.target.result;

				// 	expect(settings).not.toBe(null);
				// 	expect(settings.get('cloudAuth').email).toEqual('jamesapp@jeffersoncampos.eti.br');
				// 	expect(settings.get('cloudAuth').password).toEqual('super_secret');
				// };

				return true;
			});
		});

		describe('Delete.', function() {
			it('Should implement test!', function() {
				return true;
			});
		});
	});
});
