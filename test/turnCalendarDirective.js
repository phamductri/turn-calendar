/**
 * Jasmine tests for directive functionalities. To view content of the element,
 * use this: console.info(element.find('table').eq(0).find('tbody')[0].innerHTML)
 *
 * @author Tri Pham <tri.pham@turn.com>
 */
describe('turnCalendar directive', function() {
    var $rootScope, $compile, element;
    beforeEach(module('turn/calendar'));
    beforeEach(module('turnCalendar.html'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;

    }));

    describe('base case', function ()  {
        beforeEach(function () {
            element = $compile('<turn-calendar starting-month="11" starting-year="2013"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('show only one calendar instance', function () {
            expect(element.find('table').length).toBe(1);
        });

        it('starts in Dec 2013', function () {
            expect(element.find('thead').find('tr').eq(0).find('th').text()).toEqual('Dec');
        });
    });

    describe('calendar with backward and forward months', function() {
        beforeEach(function () {
            element = $compile('<turn-calendar starting-month="11" starting-year="2013" backward-months="2" forward-months="2"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('has 5 calendar instances', function () {
            expect(element.find('table').length).toBe(5);
        });
    });

    describe('calendar with Wednesday as start day of week', function() {
        beforeEach(function () {
            element = $compile('<turn-calendar starting-month="11" starting-year="2013" start-day-of-week="3"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('begins the week as Wednesday', function () {
            expect(element.find('thead').find('tr').eq(1).find('th').eq(0).text()).toEqual('We');
        });
    });

    describe('calendar with prior button', function() {
        beforeEach(function () {
            element = $compile('<turn-calendar prior-range-presets="[{value: 20, isDefault: true}, {value: 45}, {value : 90}]"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('has 3 buttons', function () {
            expect(element.find('button').eq(1).text()).toEqual('20');
            expect(element.find('button').eq(2).text()).toEqual('45');
            expect(element.find('button').eq(3).text()).toEqual('90');
        });
    });

    describe('calendar with minSelectDate', function() {
        beforeEach(function () {
            element = $compile('<turn-calendar starting-month="11" starting-year="2014" backward-months="1" forward-months="1" min-select-date="\'11/03/2014\'"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });
        
        it('has no available date on 11/02/2014', function () {
            expect(element.find('table').eq(0).find('tbody').find('tr').eq(1).find('td').eq(0).hasClass('turn-calendar-unavailable')).toBeTruthy();
        });

        it('has available date on 11/03/2014', function () {
            expect(element.find('table').eq(0).find('tbody').find('tr').eq(2).find('td').eq(1).hasClass('turn-calendar-unavailable')).toBe(false);
        });

        it('has available date on 11/04/2014', function () {
            expect(element.find('table').eq(0).find('tbody').find('tr').eq(2).find('td').eq(2).hasClass('turn-calendar-unavailable')).toBe(false);
        });
    });

    describe('calendar with maxSelectDate', function() {
        beforeEach(function () {
            element = $compile('<turn-calendar starting-month="11" starting-year="2014" backward-months="1" forward-months="1" max-select-date="\'01/06/2015\'"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });
        
        it('has no available dates on 01/07/2015', function () {
            expect(element.find('table').eq(2).find('tbody').find('tr').eq(1).find('td').eq(3).hasClass('turn-calendar-unavailable')).toBeTruthy();
        });

        it('has available dates on 01/06/2015', function () {
            expect(element.find('table').eq(2).find('tbody').find('tr').eq(1).find('td').eq(2).hasClass('turn-calendar-unavailable')).toBe(false);
        });

        it('has available date on 01/05/2014', function () {
            expect(element.find('table').eq(2).find('tbody').find('tr').eq(1).find('td').eq(1).hasClass('turn-calendar-unavailable')).toBe(false);
        });
    });

    describe('calendar with minSelectDate and startDate', function() {
        beforeEach(function () {
            element = $compile('<turn-calendar starting-month="11" starting-year="2014" backward-months="1" forward-months="1" min-select-date="\'11/03/2014\'" start-date="\'11/01/2014\'" end-date="\'11/13/2014\'"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('is selected on 11/04/2014 as start date due to minSelectDate restriction', function () {
            expect(element.find('table').eq(0).find('tbody').find('tr').eq(2).find('td').eq(2).hasClass('turn-calendar-selected-daily')).toBe(true);
        });

        it('is not selected on 11/02/2014, and has unavailable status instead', function () {
            expect(element.find('table').eq(0).find('tbody').find('tr').eq(1).find('td').eq(0).hasClass('turn-calendar-unavailable')).toBe(true);
        });
    });

    describe('calendar with maxSelectDate and endDate', function() {
        beforeEach(function () {
            element = $compile('<turn-calendar starting-month="11" starting-year="2014" backward-months="1" forward-months="1" max-select-date="\'01/06/2015\'" start-date="\'11/15/2014\'" end-date="\'01/08/2015\'"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('is selected on 01/05/2015 instead of 01/08/2015 due to maxSelectDate restriction', function () {
            expect(element.find('table').eq(2).find('tbody').find('tr').eq(1).find('td').eq(1).hasClass('turn-calendar-selected-daily')).toBe(true);
        });

        it('has unavailable date on 01/07/2015', function () {
            expect(element.find('table').eq(2).find('tbody').find('tr').eq(2).find('td').eq(3).hasClass('turn-calendar-unavailable')).toBe(true);
        });
    });

    describe('calendar weekly select mode', function () {
        beforeEach(function () {
            element = $compile('<turn-calendar starting-month="11" starting-year="2014" backward-months="1" forward-months="1" weekly-select-range="30" start-date="\'11/15/2014\'" end-date="\'01/08/2015\'"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('is selected on 01/05/2015 and the mode is weekly', function () {
            expect(element.find('table').eq(2).find('tbody').find('tr').eq(1).find('td').eq(1).hasClass('turn-calendar-selected-weekly')).toBe(true);
        });
    });

    describe('calendar monthly select mode', function () {
        beforeEach(function () {
            element = $compile('<turn-calendar starting-month="11" starting-year="2014" backward-months="1" forward-months="1" monthly-select-range="30" start-date="\'11/15/2014\'" end-date="\'01/08/2015\'"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('is selected on 01/05/2015 and the mode is monthly', function () {
            expect(element.find('table').eq(2).find('tbody').find('tr').eq(2).find('td').eq(1).hasClass('turn-calendar-selected-monthly')).toBe(true);
        });
    });

    describe('calendar weekly and monthly select mode together, and the cursor is between weekly and monthly ', function () {
        beforeEach(function () {
            element = $compile('<turn-calendar starting-month="11" starting-year="2014" backward-months="1" forward-months="1" weekly-select-range="30" monthly-select-range="90" start-date="\'11/15/2014\'" end-date="\'01/08/2015\'"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('is selected on 01/05/2015 and the mode is weekly, because it is within weekly range but not in monthly range', function () {
            expect(element.find('table').eq(2).find('tbody').find('tr').eq(1).find('td').eq(1).hasClass('turn-calendar-selected-weekly')).toBe(true);
        });
    });

    describe('calendar max forward month ', function () {
        beforeEach(function () {
            element = $compile('<turn-calendar starting-month="11" starting-year="2014" backward-months="2" forward-months="2" max-forward-month="\'0/2015\'"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('has only 4 month instances, due to restriction by max month forward', function () {
            expect(element.find('table').length).toBe(4);
        });
    });

    describe('calendar min backward month ', function () {
        beforeEach(function () {
            element = $compile('<turn-calendar starting-month="11" starting-year="2014" backward-months="2" forward-months="2" min-backward-month="\'11/2014\'"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('has only 3 month instances, due to restriction by min backward month ', function () {
            expect(element.find('table').length).toBe(3);
        });
    });

    describe('calendar day click disabled mode ', function () {
        beforeEach(function () {
            element = $compile('<turn-calendar selection-mode="disableDayClick"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('should not show text input for dates ', function () {
            expect(element.find('span').eq(1).css('display')).toBe('none'); // 'From'
            expect(element.find('input').eq(0).css('display')).toBe('none'); // Date
            expect(element.find('span').eq(2).css('display')).toBe('none'); // 'To'
            expect(element.find('input').eq(1).css('display')).toBe('none'); // Date
        });

        it('should set left margin of prior days selection to zero ', function () {
            expect(element.find('span').eq(3).hasClass('no-left-margin')).toBe(true); // 'Prior'
        });

        it('should not show month navigation buttons ', function () {
            expect(element.find('div').eq(7).css('display')).toBe('none'); // Left arrow
            expect(element.find('div').eq(9).css('display')).toBe('none'); // Right arrow
        });

        it('has turn-calendar-unclickable class applied to every day in turn-calendar-table ', function () {
            expect(element.find('table').eq(0).find('td').hasClass('turn-calendar-unclickable')).toBe(true);
        });

        it('has turn-calendar-unavailable class applied to every day in turn-calendar-table ', function () {
            expect(element.find('table').eq(0).find('td').hasClass('turn-calendar-unavailable')).toBe(true);
        });
    });


    describe('calendar with timezone ', function () {
        beforeEach(function () {

            jasmine.log('LET ME SEE THE PROBLEM');

            timezoneJS.timezone.zoneFileBasePath = './test/tz';
            timezoneJS.timezone.init({ async: false });

            element = $compile('<turn-calendar end-date="1437616946000" start-date="1436486400000" starting-month="6" starting-year="2015" timezone="Asia/Ho_Chi_Minh"> </turn-calendar>')($rootScope);
            $rootScope.$digest();
        });

        it('has calendar selected between July 23th 2015 and July 10th 2015 because of the Ho Chi Minh City timezone, regardless of where it executes', function () {
            expect(element.find('table').eq(0).find('tbody').find('tr').eq(1).find('td').eq(4).hasClass('turn-calendar-selected-daily')).toBe(false);
            expect(element.find('table').eq(0).find('tbody').find('tr').eq(1).find('td').eq(5).hasClass('turn-calendar-selected-daily')).toBe(true);
            expect(element.find('table').eq(0).find('tbody').find('tr').eq(3).find('td').eq(4).hasClass('turn-calendar-selected-daily')).toBe(true);
            expect(element.find('table').eq(0).find('tbody').find('tr').eq(3).find('td').eq(5).hasClass('turn-calendar-selected-daily')).toBe(false);
        });
    });

});