// define(['../../../../js/app'], function (App) {
define(['app'], function (App) {
	return describe('Test app file.', function() {
		it('Should return correct date formatted.', function() {
			expect(App.dateFormat(new Date(2014, 5, 23))).toEqual('23/06/2014');
		});
	});
});
