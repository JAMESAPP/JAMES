// TODO migrate form require
define(function(require) {
    var $ = require('jquery'),
        Backbone = require('backbone'),
// TODO use markup instead mustache
        Mustache = require('mustache'),
        homeTemplate = require('text!templates/home.mustache');

    var HomeView = Backbone.View.extend({
        mainEl: $('#main'),
        tagName: 'div',

        initialize: function() {
            this.render();
        },

        render: function() {
            var template = Mustache.render(homeTemplate);
            $(this.el).html( template );
            $(this.mainEl).html( $(this.el) );
        }
    });

    return HomeView;
});
