define([
	'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: {
			date: null
			, taken: false
			, isMenstruating: false
			, memo: null
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';

			if (attr.taken == '')
				return 'Taken can\'t be empty!';

			if (attr.isMenstruating == '')
				return 'isMesntriating can\'t be empty!';

			if (attr.memo == '')
				return 'Memo can\'t be empty!';
		}
    });

    return Model;
});
