define([
	'backbone'
	, 'underscore'
	, 'collections/generic'
], function (Backbone, _, Collection) {
    var Model = Backbone.Model.extend({
		// FIXME how to update view?
		repopulate: function(entity, transaction, url, el) {
			var coll
			;

			transaction.objectStore(entity).clear().onsuccess = function(event) {
				coll = new Collection();
				coll.url = url + '/' + entity;
				coll.fetch({
					async: false
					, success: function(collection, response, options) {
						_.forEach(collection.toJSON(), function(element, index, list) {
							transaction.objectStore(entity).add(element).onsuccess = function(event) {
								console.log('Re-added ' + entity + ' id #' + element.id);
								self.$el.find(el).html('<span class="glyphicon glyphicon-ok"></span>');
							};
						});	
					}
					, error: function(coolection, response, options) {
						// TODO handle error
					}
				});
			};
		}

		// FIXME how to update view?
		, saveModelOnBackend: function(coll, en, url) {
			var entity;
			_.forEach(coll, function(element, index, list) {
				entity = new Model(element);
				delete entity.id;
				entity.url = url;
				entity.save(null, {
					success: function(model, response, error) {
						console.log('Saved ' + en + ' #' + model.id + ' with sucess!');
					}, 
					error: function(model, response, error) {
						console.log('Failed to save ' + en + ' #' + model.id + ' with sucess!');
					}
				});
			});
		}
    });

    return Model;
});
