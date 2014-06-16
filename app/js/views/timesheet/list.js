define([
	'underscore'
	, 'marionette'
	, 'models/expense'
	, 'views/list'
	, 'text!../../../templates/timesheet/list.tpl'
	, 'text!../../../templates/timesheet/list-item.tpl'
], function (_, Marionette, ExpenseModel, ListView, CompositeViewTemplate, ItemViewTemplate) {
	var itemView = Marionette.ItemView.extend({
		template: ItemViewTemplate,
		tagName: 'tr'
	});

	var CompositeView = ListView.extend({
		template: CompositeViewTemplate,
		itemView: itemView,
		objectStore: 'timesheet'
		, serializeData: function() {
			var attrToView = _.clone(this.attributes) || {};

			console.log(this.collection);
			console.log(this.attributes);
			console.log(attrToView);

			var later = _.filter(this.collection.toJSON(), function(model) {
				return model.startTime == '08:07';
			});

			// Total Days Late to Work
			attrToView.totalLater = later.length;

			// Total Minutes After Start
			var totalMinutesLaterAfterStart;
			_.forEach(later, function(element, index, list) {
				console.log(element);
				console.log(index);
				console.log(list);

				totalMinutesLaterAfterStart += element.startTime;
			});

			// Total Extra Time
			// Extra time before start
			var daysWithExtraTimeBeforeStart = _.filter(this.collection.toJSON(), function(model) {
				return model.startTime < officialStartTime;
			});
			var totalExtraTimeBeforeStart;
			_.forEach(daysWithExtraTimeBeforeStart, function(element, index, list) {
				console.log(element);
				console.log(index);
				console.log(list);
				
				// TODO calculate extra time before start. Considering the folloow rule for each hour before:
				// 0..20 min before: 0 min;
				// 21..40 min before: 30 min;
				// 41..60 min before: 1 hour;
			});
			// Extra time after end
			var daysWithExtraTimeAfterEnd = _.filter(this.collection.toJSON(), function(model) {
				return model.endTime > officialEndTime;
			});
			var totalExtraTimeAfterEnd;
			_.forEach(daysWithExtraTimeAfterEnd, function(element, index, list) {
				console.log(element);
				console.log(index);
				console.log(list);
				
				// TODO calculate extra time after end. Considering the folloow rule for each hour after:
				// 0..20 min before: 0 min;
				// 21..40 min before: 30 min;
				// 41..60 min before: 1 hour;
			});

			// Finally, the total of extra time!
			var totalExtraTime = totalExtraTimeBeforeStart + totalExtraTimeAfterEnd;

			// Total Leaving Early
			var daysWithLeavingEarly = _.filter(this.collection.toJSON(), function(model) {
				// TODO implement leaving early
				// if total hours worked <= workload then must discount those hours!
				return true;
			});
			var totalTimeLeavingEarly;
			_.forEach(daysWithLeavingEarly, function(element, index, list) {
				console.log(element);
				console.log(index);
				console.log(list);

				// TODO implement it!
			});

			// Balance
			var balance = totalExtraTime - totalTimeLeavingEarly;

			// Status
			// TODO implement it!
			// until 8 days late to work and less than 45 minutes total minutes after: good else: bad

			// TODO filter by month
			attrToView.selectMonth = [
				{label: 'January', value: 0}
				, {label: 'February', value: 1}
				, {label: 'March', value: 2}
				, {label: 'April', value: 3}
				, {label: 'May', value: 4}
				, {label: 'June', value: 5}
				, {label: 'July', value: 6}
				, {label: 'August', value: 7}
				, {label: 'September', value: 8}
				, {label: 'October', value: 9}
				, {label: 'November', value: 10}
				, {label: 'December', value: 11}
			];

			return attrToView;
		}

	});

	return CompositeView;
});
