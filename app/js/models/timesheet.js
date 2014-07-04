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
    });

    return Model;
});
