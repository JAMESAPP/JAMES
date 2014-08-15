define([
	'jquery'
	, 'bootstrap'
	, 'backbone'
	, 'marionette'
	, 'moment'
	, 'models/indexedDB'
	, 'templates'
], function ($, Bootstrap, Backbone, Marionette, Moment, IndexedDB, Templates) {
	var app = new Marionette.Application();

	// FIXME Bootstrap var is in memory but i cant access it!

	app.addRegions({
		mainRegion: '#main',
		menuRegion: '#menu',
		footerRegion: '#footer'
	});

	Marionette.Renderer.render = function(template, data) {
		return Templates[template](data);
	};

	app.dateFormat = function(date, format, lang) {
		if (format == undefined)
			format = 'DD/MM/YYYY'; // brazilian default date format

		if (lang == undefined)
			lang = 'pt-br'; // brazilian by default

		var m = Moment(new Date(+date || date)).lang(lang);

		return m.format(format);
	},

	// TODO implement all, except generic, to use marionette
	app.getTemplate = function(template) {
		return  $.ajax({
			type: "GET",
			url: "app/templates/" + template + ".tpl",
			async: false
		}).responseText;
	};

	app.ConfigureAjaxBackbone = function () {
		arguments[0].async = false;
		arguments[0].cache = false;

		return Backbone.$.ajax.apply(Backbone.$, arguments);
	};

	app.initializeDB = function() {
		this.indexedDB = new IndexedDB();
		this.indexedDB.openDB();
	};

	return app;
});
