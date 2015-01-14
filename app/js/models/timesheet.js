define([
	'backbone'
    , 'app'
], function (Backbone, App) {
    var Model = Backbone.Model.extend({
		defaults: {
			date: App.dateFormat(new Date())
			// TODO implement now for startTime
			, startTime: null
			, startTimeMachine: 'PACO_FLOOR-00_LEFT-01'
			, startTimeMotive: null
			// TODO implement now for endTime
			, endTime: null
			, endTimeMachine: 'PACO_FLOOR-00_LEFT-01'
			, endTimeMotive: null
			, leavingEarly: null
			, officialShift: true
		}

		, validade: function(attr, options) {
			if (attr.date == '')
				return 'Date can\'t be empty';

			// TODO implement more validation
			// if (attr.startTime == '' && attr.endTime == '' && (attr.leavingEarly == '' || attr.leavingEarly == null))
			// 	return 'startTime && endTime && leavingEarly can\'t be empty!';
		}

		, rule30: function(minutes) {
			if (minutes < 30)
				minutes = 0;
			else
				minutes = 30;

			return minutes;
		}

		, originalRule: function(minutes) {
			if (minutes < 21)
				minutes = 0;
			else if (minutes < 41)
				minutes = 30;
			else
				minutes = 60;

			return minutes;
		}
    });

    return Model;
});
