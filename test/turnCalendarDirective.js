describe('turnCalendar directive', function() {
    var $rootScope, $compile, element;
    beforeEach(module('turnCalendar'));
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
            expect(element.find('thead').find('tr').eq(0).find('th').text()).toEqual('Dec 2013');
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
});