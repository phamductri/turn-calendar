describe('turnCalendar service test', function() {

    var turnCalendarService;

    beforeEach(angular.mock.module('turn/calendar'));

    beforeEach(inject(function ($injector) {
        turnCalendarService = $injector.get('turnCalendarService');

    }));

    it ('test the array split function', function () {
        var array = [1, 2, 3, 4, 5, 6, 7, 8];
        var newArray = turnCalendarService.arraySplit(array, 4);
        expect(newArray.length).toEqual(2);

    });

    it ('test the month validation function', function () {
        var month = -3;
        var value = turnCalendarService.isMonthValid(month);
        expect(value).toBe(false);
    });

    it ('convert the string into date object', function () {
        var dateString = '8/2013';
        var value = turnCalendarService.convertToDateObject(dateString);

        expect(value).toEqual(new Date(2013, 8, 1));
    });

    it ('validate the input string to be true', function () {
        var dateString = '8/1/2013';
        var value = turnCalendarService.validateDateInput(dateString);

        expect(value).toBe(true);
    });

    it ('validate the input string to be false', function () {
        var dateString = '8/1/2013gfhdjfhgj';
        var value = turnCalendarService.validateDateInput(dateString);

        expect(value).toBe(false);
    });
});