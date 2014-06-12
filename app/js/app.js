define([
	'jquery'
	, 'bootstrap'
	, 'backbone'
	, 'marionette'
	, 'config'
	, 'models/indexedDB'
	, 'handlebars'
], function ($, Bootstrap, Backbone, Marionette, Config, IndexedDB, Handlebars){
	var app = new Marionette.Application();

	// FIXME Bootstrap var is in memory but i cant access it!

	app.addRegions({
		mainRegion: '#main',
		menuRegion: '#menu',
		footerRegion: '#footer'
	});

	Marionette.Renderer.render = function(template, data) {
		var compiled = Handlebars.compile(template);
		return compiled(data);
	};

	// TODO implement all, except generic, to use marionette
	app.getTemplate = function(template) {
		return  $.ajax({
			type: "GET",
			url: "app/templates/" + template + ".tpl",
			async: false
		}).responseText;
	};

	app.getBaseURL = function(app) {
		if (app == undefined)
			app = 'yaew';

		return "http://local." + app + "/" + Config.backend + "/";
	};

	app.ConfigureAjaxBackbone = function () {
		arguments[0].async = false;
		arguments[0].cache = false;

		return Backbone.$.ajax.apply(Backbone.$, arguments);
	};

	// app.getConfig = function(file) {
	// 	if (file == undefined)
	// 		file = "app/data/config.json";

	// 	var config = $.ajax({
	// 		type: "GET",
	// 		url: file,
	// 		async: false
	// 	}).responseText;

	// 	console.log(config);
	// 	return JSON.parse(config);
	// 	// return config;
	// };

	app.initializeDB = function() {
		this.indexedDB = new IndexedDB();
		this.indexedDB.openDB();
	};

	return app;
});
