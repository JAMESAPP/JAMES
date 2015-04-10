define([
	'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: {
			date: null
			, cycle: null
			, state: undefined // not taken yet (yellow); taken (green); missed(red); void day (gray); is menstruating (blue)
			, memo: null
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';

			if (attr.state == '')
				return 'State can\'t be empty!';

			if (attr.memo == '')
				return 'Memo can\'t be empty!';
		}
    });

    return Model;
});
