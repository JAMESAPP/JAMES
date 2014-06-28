// define(['../../../../js/app'], function (App) {
define([
	'app'
	, 'collections/generic'
	, 'text!../../../../../../../data/test/timesheet/noDaysLater.json'
	, 'text!../../../../../../../data/test/timesheet/withDaysLater.json'
], function (App, TimesheetCollection, NoDaysLater, WithDaysLater) {
	return describe('Timesheet.', function() {
		describe('View', function() {
			var noDayLaterToWork = new TimesheetCollection(JSON.parse(NoDaysLater));
			var withDayLaterToWork = new TimesheetCollection(JSON.parse(WithDaysLater));

			it('Should return total days late to work.', function() {
				return true;
			});

			it('Should return total minutes after start.', function() {
				return true;
			});

			it('Should return total extra time.', function() {
				return true;
			});

			it('Should return total leaving early.', function() {
				return true;
			});

			it('Should return status.', function() {
				return true;
			});
		});

		describe('Model', function() {
			it('Should calculate extra time in one day.', function() {
				return true;
			});
		});
	});
});
