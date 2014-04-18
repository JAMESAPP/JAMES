define([
		'jquery'
		, 'bootstrap'
		, 'backbone'
		, 'marionette'
		, 'config'
		, 'handlebars'
], function ($, Bootstrap, Backbone, Marionette, Config, Handlebars){
		var App = new Marionette.Application();

		// FIXME Bootstrap var is in memory but i cant access it!

		App.addRegions({
				mainRegion: '#main',
				menuRegion: '#menu',
				footerRegion: '#footer'
		});

		Marionette.Renderer.render = function(template, data) {
				var compiled = Handlebars.compile(template);
				return compiled(data);
		};

		// TODO implement all, except generic, to use marionette
		App.getTemplate = function(template) {
				return  $.ajax({
						type: "GET",
						url: "app/templates/" + template + ".tpl",
						async: false
				}).responseText;
		};

		App.getBaseURL = function(app) {
				if (app == undefined)
						app = "yawecapp";

				return "http://local." + app + "/" + Config.backend + "/";
		};

		App.ConfigureAjaxBackbone = function () {
				arguments[0].async = false;
				arguments[0].cache = false;

				return Backbone.$.ajax.apply(Backbone.$, arguments);
		};

		return App;
});
