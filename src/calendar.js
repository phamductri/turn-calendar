/**
 * @ngdoc directive
 * @name calendar
 * @restrict AE
 *
 * @description
 * An AngularJS directive that allows a calendar to be display when embedded.
 *
 * Allow the following options :
 *
 * @param {number} startingMonth - The starting month of the calendar, if not
 * specify will use the current month. January is count as 0, February is 1,
 * and so on.
 *
 * @param {number} startingYear - The starting year of the calendar, if not
 * specify will use the current year
 *
 * @param {number} backwardMonths - The number of calendar instances of previous
 * months count from the current instance, notice the s. For example, if the
 * current month is September, and you want to display July and August in your
 * calendar pop up, set backwardMonths=2. Maximum allowed value is 6. Minimum
 * allowed is 1.
 *
 * @param {number} forwardMonths - The number of calendar instances of next
 * months count from the current instance, notice the s at the end. For example:
 * current month is September, and you want to display October and November, set
 * forwardMonths=2. Maximum allowed value is 6. Minimum allowed is 1.
 *
 * @param {boolean} useMonday - The week start on Monday instead of Sunday like
 * regular calendar
 *
 * @example
 *
 * <calendar use-monday="true" starting-month="7" starting-year="2013" forward-months="2" backward-months="2">
 * </calendar>
 *
 * The above code sniplet will display 5 months instance, starting from June 2013
 * to Oct 2013, with Monday as the starting day of the week
 *
 * @author Tri Pham <tri.pham@turn.com>
 */
angular
    .module('calendar', ['calendarTemplates'])
    .controller('CalendarController', ['$scope', function ($scope) {

        /**
         * Month name to display on calendar
         *
         * @type {array}
         */
        const MONTH_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        /**
         * Constraint on maximum months allowed to display, either as forward
         * or backward
         *
         * @type {number}
         */
        const MAX_MONTH_ALLOWED = 6;

        /**
         * Constraint on minimum months allowed to display as extra forward or
         * backward
         *
         * @type {number}
         */
        const MIN_MONTH_ALLOWED = 1;

        /**
         * Maximum number of day to display on a calendar in month view
         *
         * @type {number}
         */
        const MAX_DAY = 42;

        /**
         * Determine the month for starting month, if not specify from input it
         * will use the current month
         *
         * @returns {number} - Starting month of the base month of calendar
         */
        var setMonth = function () {

            var month, currentDate = new Date();

            if ($scope.startingMonth && $scope.startingMonth >= 0) {
                month = $scope.startingMonth;
            } else {
                month = currentDate.getMonth();
            }

            return month;
        };

        var setYear = function () {

            var year, currentDate = new Date();

            if ($scope.startingYear) {
                year = $scope.startingYear;
            } else {
                year = currentDate.getFullYear();
            }

            return year;
        };

        $scope.monthNames = [];

        var isMonthValid = function (month) {
            return month && month >= MIN_MONTH_ALLOWED && month <= MAX_MONTH_ALLOWED;
        }

        var setForwardMonths = function (monthArray, month, year) {

            if (!isMonthValid($scope.forwardMonths)) {
                return;
            }

            var yearReset = false;

            for (var i = 1; i <= $scope.forwardMonths; i++) {

                var newMonth = month + i;

                // Bigger than 11 means moving to next year
                if (newMonth > 11) {
                    newMonth = newMonth % 12;

                    if (!yearReset) {
                        year = year + 1;
                        yearReset = true;
                    }
                }



                monthArray.push(generateDayArray(year, newMonth));
                $scope.monthNames.push(MONTH_NAME[newMonth] + ' ' + year);

            }

        };

        var setBackwardMonths = function (monthArray, month, year) {

            if (!isMonthValid($scope.backwardMonths)) {
                return;
            }

            var yearReset = false, newMonthCount = 0;

            for (var i = 1; i <= $scope.backwardMonths; i++) {

                var newMonth = month - i;

                // The year has been reset, use newMonthCount, not i
                if (yearReset) {
                    newMonth = month - newMonthCount;
                    newMonthCount++;
                }

                // Lower than 0 means moving backward to previous year
                if (newMonth < 0) {
                    month = newMonth = 11;
                    year = year - 1;
                    yearReset = true;
                    newMonthCount++;
                }

                monthArray.unshift(generateDayArray(year, newMonth));
                $scope.monthNames.unshift(MONTH_NAME[newMonth] + ' ' + year);
            }

        }

        var generateMonthArray = function () {
            var year = setYear(),
                month = setMonth(),
                baseMonth = generateDayArray(year, month),
                monthArray = [];

            monthArray.push(baseMonth);
            $scope.monthNames.push(MONTH_NAME[month] + ' ' + year);


            setForwardMonths(monthArray, month, year);

            setBackwardMonths(monthArray, month, year);

            return monthArray;

        };



        /**
         * Function to determine the first day of the 42 day to be shown on a
         * month view calendar.
         *
         * @param {number} year - The year in question
         * @param {number} month - The month in question
         * @returns {object} Javascript date object of the first date to be shown
         */
        var getFirstDate = function (year, month) {

            var firstDayOfMonth = new Date(year, month, 1),
                dayOfWeek = firstDayOfMonth.getDay(),
                firstDate;

            if ($scope.useMonday) {
                firstDate = new Date(firstDayOfMonth.setDate(2 - dayOfWeek));
            } else {
                firstDate = new Date(firstDayOfMonth.setDate(1 - dayOfWeek))
            }

            return firstDate;

        };

        /**
         * An utility function to split a big array into small chunks of a fixed
         * size.
         *
         * @param {array} array - The array to be split
         * @param {number} size - The fix size to be split into
         * @returns {array} An array of fixed size array
         */
        var arraySplit = function (array, size) {
            var arrays = [];
            while (array.length > 0) {
                arrays.push(array.splice(0, size));
            }
            return arrays;
        };

        /**
         * Function to generate the full 42 day to be shown on the calendar
         *
         * @param {number} year - The year to be shown
         * @param {number} month - The month to be shown
         * @returns {array} A 2 dimension array contains the weeks to be shown
         */
        var generateDayArray = function (year, month) {
            var currentDate = new Date(getFirstDate(year, month)),
                dayArray = [];

            //console.log('current date is');
            //console.log(currentDate);


            for (var i = 0; i < MAX_DAY; i++) {
                dayArray.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return arraySplit(dayArray, 7);
        };

        $scope.selectedDate = new Date().toLocaleDateString();




        $scope.dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        if ($scope.useMonday) {
            $scope.dayNames.push('Su');
        } else {
            $scope.dayNames.unshift('Su');
        }

        $scope.monthArray = generateMonthArray();

        // Allow to show the calendar or hide it
        $scope.calendarEnabled = false;

        /**
         * Function to show the calendar or hide it
         */
        $scope.enableCalendar = function () {
            $scope.calendarEnabled = !$scope.calendarEnabled;
        };
    }])
    .directive('calendar', function () {

        return {
            restrict: 'AE',
            scope: {
                startingMonth: '=',
                startingYear: '=',
                backwardMonths: '=',
                forwardMonths: '=',
                useMonday: '='
            },
            controller: 'CalendarController',
            templateUrl: 'calendar.html'
        };

    });