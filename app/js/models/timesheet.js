define([
	'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: {
			// TODO implement today for date
			date: App.dateFormat(new Date())
			// TODO implement now for startTime
			, startTime: null
			, startTimeMotive: null
			// TODO implement now for endTime
			, endTime: null
			, endTimeMotive: null
			, leavingEarly: null
			, leavingEarlyMotive: null
			, observation: null
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';

			if (attr.startTime == '' && attr.endTime == '' && (attr.leavingEarly == '' || attr.leavingEarly == null))
				return 'startTime && endTime && leavingEarly can\'t be empty!';
		}
    });

    return Model;
});
