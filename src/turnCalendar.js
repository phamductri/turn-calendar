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
 * allowed is 1. If you don't set anything or setting values not in allowed
 * range, there won't be any backward months to display.
 *
 * @param {number} forwardMonths - The number of calendar instances of next
 * months count from the current instance, notice the s at the end. For example:
 * current month is September, and you want to display October and November, set
 * forwardMonths=2. Maximum allowed value is 6. Minimum allowed is 1. If you
 * don't set anything or setting values not in allowed range, there won't be
 * any forward months to display.
 *
 * @param {boolean} useMonday - The week start on Monday instead of Sunday like
 * regular calendar. If not specify or set to true the calendar will use Sunday
 * as the first day of week
 *
 * @param {string} minSelectDate - The minimum date which any dates which are
 * earlier than that date will not be able to be selected, accept a string in
 * MM-DD-YYYY or MM/DD/YYYY format
 *
 * @param {string} maxSelectDate - The maximum date which any dates which are
 * later than that date will not be able to be selected, accept a string in
 * MM-DD-YYYY or MM/DD/YYYY format
 *
 * @param {number} weeklySelectRange - A number in which if the hovered/selected
 * SECOND date is beyond the FIRST selected date, the mouse pointer will change
 * to WEEKLY hover/selected mode
 *
 * @param {number} monthlySelectRange - A number in which if the hovered/selected
 * SECOND date is beyond the FIRST selected date, the mouse pointer will change
 * to MONTHLY hover/selected mode
 *
 * @param {array} priorRangePresets - An array of object that specify the range
 * buttons to appear for user to select prior range from the CURRENT date. If
 * you want a pre-selected range add a property called isDefault: true. The
 * object MUST have a property called 'value' to display it. Value is a number.
 * The range will conform with minSelectDate, maxSelectDate, weeklySelectDate,
 * monthlySelectDate parameters if these parameters are set.
 *
 * @param {array} monthName - An array of string that will override the default
 * English month name, if you want to display the month in your language, if
 * not specify will display month in English abbreviation
 *
 * @param {array} dayName - An array of string that will override the default
 * English day name, set this option if you want to display the day in your
 * language, if not specify will display the day in English abbreviation. The
 * array should begin with Sunday, ended with Saturday
 *
 * @example
 *
 * <turn-calendar use-monday="true" starting-month="11" starting-year="2013"
 *                forward-months="3" backward-months="3" min-select-date="'09/13/2013'"
 *                weekly-select-range="30" monthly-select-range="60"
 *                prior-range-presets="[{value: 20, isDefault: true}, {value: 45}, {value : 90}]"
 *                month-name="['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Bốn', 'Tháng Năm', 'Tháng Sáu',
 *                'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai']"
 *                day-name="['Chủ nhật','Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']">
 * <turn-calendar>
 *
 * The above code snippet will display 7 months instance, starting from Sep 2013
 * to March 2014, with Monday as the starting day of the week, the base month is
 * Dec 2013, it will change to weekly select mode if the cursor is 30 days beyond
 * the current selected date, monthly select mode if cursor is 60 days beyond the
 * current selected date. It will display 3 prior buttons: 20, 45, 90, with 25 is
 * pre-selected from the CURRENT date. Anything before 09/13/2013 is not available
 * for selection. It display the month name and day name in Vietnamese.
 *
 * @author Tri Pham <tri.pham@turn.com>
 */
angular
    .module('turn/calendar', ['calendarTemplates'])
    .controller('CalendarController', ['$scope', function ($scope) {


        /**
         * Default month name to display on calendar
         *
         * @type {array}
         */
        var MONTH_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        /**
         * Default day name to display on calendar
         *
         * @type {array}
         */
        var DAY_NAME = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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
         * Number of day in a week
         *
         * @type {number}
         */
        const DAY_IN_WEEK = 7;

        /**
         * An array which will contains the month name with year to display on
         * the template
         *
         * @type {array}
         */
        $scope.monthNames = [];

        /**
         * An array which contains the name of day of week, to be displayed
         * by template
         *
         * @type {array}
         */
        $scope.dayNames = [];

        if ($scope.dayName()) {
            DAY_NAME = $scope.dayName();
        }

        var sunday = DAY_NAME.shift();
        $scope.dayNames = $scope.dayNames.concat(DAY_NAME);

        if ($scope.useMonday) {
            $scope.dayNames.push(sunday);
        } else {
            $scope.dayNames.unshift(sunday);
        }

        if ($scope.monthName()) {
            MONTH_NAME = $scope.monthName();
        }

        /**
         * Determine the starting month for base month, if not specify from input
         * it will use the current month
         *
         * @returns {number} - Starting month of the base month of calendar
         */
        var setBaseMonth = function () {

            var month, currentDate = new Date();

            if ($scope.startingMonth && $scope.startingMonth >= 0) {
                month = $scope.startingMonth;
            } else {
                month = currentDate.getMonth();
            }

            return month;
        };

        /**
         * Determine the starting year of base month, if not specify will use
         * the current year
         *
         * @returns {number} - The starting year of base month of calendar
         */
        var setBaseYear = function () {

            var year, currentDate = new Date();

            if ($scope.startingYear) {
                year = $scope.startingYear;
            } else {
                year = currentDate.getFullYear();
            }

            return year;
        };


        var isMonthValid = function (month) {
            return month && month >= MIN_MONTH_ALLOWED && month <= MAX_MONTH_ALLOWED;
        };

        /**
         * Add the number of forward months into base month
         *
         * @param {array} monthArray - The current month array
         * @param {number} month - The month to be added
         * @param {year} year - The year of the month to be added
         */
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

        /**
         * Add the backward months into the base month
         *
         * @param {array} monthArray - The month array
         * @param {number} month - The month to be added
         * @param {number} year - The year to be added
         */
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

        };

        /**
         * Function to generate an array that contains several months per specify
         * by the config from user
         *
         * @returns {array} The array that contains
         */
        var generateMonthArray = function () {
            var year = setBaseYear(),
                month = setBaseMonth(),
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

                /**
                 * Edge case, if the first day on month is a Sunday, and the config
                 * is to use Monday as first day of week, then going backward 6 days
                 * previous to use as first day in 42 days view
                 */
                if (dayOfWeek === 0) {
                    firstDate = new Date(firstDayOfMonth.setDate(-5));
                } else {
                    firstDate = new Date(firstDayOfMonth.setDate(2 - dayOfWeek));
                }

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

            for (var i = 0; i < MAX_DAY; i++) {
                dayArray.push(generateMetaDateObject(new Date(currentDate), month));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return arraySplit(dayArray, DAY_IN_WEEK);
        };


        /**
         * Detect if the date in question compatible with minSelectDate
         * or maxSelectDate
         *
         * @param {object} date - The date in question
         * @returns {boolean} - True if compatible, false if not
         */
        var isUnavailable = function (date) {
            return date <= new Date($scope.minSelectDate) ||
                   date >= new Date($scope.maxSelectDate);
        };


        /**
         * Function that determine if the current day is within the selected
         * range, either weekly select range or monthly select range
         *
         * @param {number} selectRange - The range to determine whether the
         * day is falling within
         * @param {number} compareRange - An optional second range, to determine
         * if the day is sandwiched between two range or not
         * @param {object} day - The day in question
         * @returns {boolean} True if exceeds or is between the two range, false
         * if not
         */
        var isDateWithinSelectedRange = function (selectRange, compareRange, day) {

            if (!selectRange) {
                return false;
            }

            var tempDateForward = new Date($scope.selectedStartDate.date.toLocaleDateString()),
                tempDateBackward = new Date($scope.selectedStartDate.date.toLocaleDateString());

            tempDateForward.setDate(tempDateForward.getDate() + selectRange);
            tempDateBackward.setDate(tempDateBackward.getDate() - selectRange);

            if (compareRange) {

                var compareRangeForward = new Date($scope.selectedStartDate.date.toLocaleDateString()),
                    compareRangeBackward = new Date($scope.selectedStartDate.date.toLocaleDateString());

                compareRangeForward.setDate(compareRangeForward.getDate() + compareRange);
                compareRangeBackward.setDate(compareRangeBackward.getDate() - compareRange);

                if (compareRange > selectRange) {
                    return !day.isUnavailable &&
                        ((day.date > tempDateForward && day.date < compareRangeForward) ||
                            (day.date > compareRangeBackward && day.date < tempDateBackward));
                }
            }

            return !day.isUnavailable && (day.date > tempDateForward || day.date < tempDateBackward);
        };

        var setWeekValue = function (week, isHover, hoverValue, selectMode) {

            week.forEach(function (day) {

                if (!day.date || day.isUnavailable) {
                    return;
                }

                if (isHover) {
                    day.isHover = hoverValue;
                    return;
                }

                day.selectMode = selectMode;

            });
        };

        var setMonthValue = function (month, isHover, hoverValue, selectMode) {
            month.forEach(function (week) {
                setWeekValue(week, isHover, hoverValue, selectMode);
            });
        };

        /**
         * Set the hover value or selected value of the day in question through
         * the month that contains the day in question
         *
         * @param {object} selectedDay - The day in question
         * @param {boolean} isHover - Whether this is a hover or selection
         * @param {boolean} hoverValue - True if hovered, false if not
         * @param {string} selectMode - The current select mode
         */
        var paletteTheMonth = function (selectedDay, isHover, hoverValue, selectMode) {

            $scope.monthArray.some(function (month) {

                var monthFound = month.some(function (week) {
                    return week.some(function (day) {
                        return day.date && day.date.getTime() === selectedDay.date.getTime();
                    })
                });

                if (monthFound) {
                    setMonthValue(month, isHover, hoverValue, selectMode);
                    return true;
                }

            });

        };

        /**
         * Set the hover value or selected value of the day in question through
         * the week that contains the day
         *
         * @param {object} selectedDay - The day in question
         * @param {boolean} isHover - Whether this is a hover or selection
         * @param {boolean} hoverValue - True if hovered, false if not
         * @param {string} selectMode - The current select mode
         */
        var paletteTheWeek = function (selectedDay, isHover, hoverValue, selectMode) {

            $scope.monthArray.some(function (month) {

                var weekFound = false;

                month.some(function (week) {

                    weekFound = week.some(function (day) {
                        return day.date && day.date.getTime() === selectedDay.date.getTime();
                    });

                    if (weekFound) {
                        setWeekValue(week, isHover, hoverValue, selectMode);
                        return true;
                    }
                });

                if (weekFound) {
                    return true;
                }

            });
        };


        /**
         * Function to determine whether to hover the cell or not
         *
         * @param {object} day - The day in question
         */
        $scope.mouseEnter = function (day) {

            if (!day.date) {
                day.isHover = false;
                return;
            }

            if ($scope.selectedStartDate && $scope.selectedEndDate) {
                day.isHover = true;
                return;
            }

            if (!$scope.selectedStartDate) {
                day.isHover = true;
                return;
            }

            if (isDateWithinSelectedRange($scope.weeklySelectRange, $scope.monthlySelectRange, day)) {
                paletteTheWeek(day, true, true, '');
                return;
            }

            if (isDateWithinSelectedRange($scope.monthlySelectRange, $scope.weeklySelectRange, day)) {
                paletteTheMonth(day, true, true, '');
                return;
            }

            if (!day.isUnavailable) {
                day.isHover = true;
            }

        };

        /**
         * Function to determine if to remove the hover of the current day
         *
         * @param {object} day - The day in question
         */
        $scope.mouseLeave = function (day) {

            if (!$scope.selectedStartDate) {
                day.isHover = false;
                return;
            }

            if (isDateWithinSelectedRange($scope.weeklySelectRange, $scope.monthlySelectRange, day)) {
                paletteTheWeek(day, true, false, '');
                return;
            }

            if (isDateWithinSelectedRange($scope.monthlySelectRange, $scope.weeklySelectRange, day)) {
                paletteTheMonth(day, true, false, '');
                return;
            }

            day.isHover = false;
        };

        /**
         * A meta date object that wrap around a plain Javascript date object,
         * it keeps several attributes to keep track of information about the
         * date in question
         *
         * selectedMode : cursor select mode, whether the current mode is 'daily',
         * 'weekly', or 'monthly'
         *
         * isHover: whether if the current date is being hovered, or being selected
         *
         * isUnavailable: the date is not available for hovering or selection
         *
         * @param {object} date - Plain Javascript date object
         * @param {number} currentMonth - If the month of date does not match
         * current month, return an empty object
         * @returns {object} A meta date object
         */
        var generateMetaDateObject = function (date, currentMonth) {

            // If the month does not match, return empty object
            if (date.getMonth() !== currentMonth) {
                return {};
            }

            return {
                date: date,
                selectMode: '',
                isHover: false,
                isUnavailable: isUnavailable(date)
            };
        };

        var isDaily = function () {
            return (!$scope.weeklySelectRange && !$scope.monthlySelectRange) ||
                   (!isDateWithinSelectedRange($scope.weeklySelectRange, $scope.monthlySelectRange, $scope.selectedEndDate) &&
                    !isDateWithinSelectedRange($scope.weeklySelectRange, $scope.monthlySelectRange, $scope.selectedEndDate));
        };

        /**
         * Determine if the date is between selected start date and end date
         *
         * @param {object} date - The date in question
         * @returns {boolean} True if between, false if not
         */
        var isBetweenStartAndEndDate = function (date) {
            return date <= $scope.selectedEndDate.date && date >= $scope.selectedStartDate.date;
        };

        /**
         * Go through all the dates to turn on the selected class if the date
         * fall in between selected start date and selected end date
         */
        var colorSelectedDateRange = function () {

            $scope.monthArray.forEach(function (month) {

                month.forEach(function (week) {

                    week.forEach(function (day) {

                        if (day && day.date && isBetweenStartAndEndDate(day.date)) {

                            if (isDaily()) {
                                day.selectMode = 'daily';
                            }

                            if (isDateWithinSelectedRange($scope.weeklySelectRange, $scope.monthlySelectRange, $scope.selectedEndDate)) {
                                day.selectMode = 'weekly';
                            }

                            if (isDateWithinSelectedRange($scope.monthlySelectRange, $scope.weeklySelectRange, $scope.selectedEndDate)) {
                                day.selectMode = 'monthly';
                            }

                        }
                    });

                });
            });

            // Color the entire end week, not just the selected end date
            if (isDateWithinSelectedRange($scope.weeklySelectRange, $scope.monthlySelectRange, $scope.selectedEndDate)) {
                paletteTheWeek($scope.selectedStartDate, false, false, 'weekly');
                paletteTheWeek($scope.selectedEndDate, false, false, 'weekly');
            }

            // Color the entire month, not just the selected end date
            if (isDateWithinSelectedRange($scope.monthlySelectRange, $scope.weeklySelectRange, $scope.selectedEndDate)) {
                paletteTheMonth($scope.selectedStartDate, false, false, 'monthly');
                paletteTheMonth($scope.selectedEndDate, false, false, 'monthly');
            }
        };

        /**
         * Remove all selected dates
         */
        var discolorSelectedDateRange = function () {
            $scope.monthArray.forEach(function (month) {
                month.forEach(function (week) {
                    week.forEach(function (day) {
                        if (day && day.selectMode) {
                            day.selectMode = '';
                            day.isHover = false;
                        }
                    });
                });
            });
        };


        /**
         * Clear the calendar of hover and selected days, reset the start date
         * to the newly selected date
         *
         * @param {object} day - The new start date
         */
        var resetCalendar = function (day) {

            $scope.selectedEndDate = null;
            discolorSelectedDateRange();
            $scope.selectedStartDate = day;
            day.selectMode = 'daily';

        };

        var isBothSelected = function () {
            return $scope.selectedStartDate && $scope.selectedEndDate;
        };

        var isNoneSelected = function () {
            return !$scope.selectedStartDate && !$scope.selectedEndDate;
        };

        var isStartDateSelected = function () {
            return $scope.selectedStartDate && !$scope.selectedEndDate;
        };

        var setEndDate = function (day) {

            if (day.date < $scope.selectedStartDate.date) {
                $scope.selectedEndDate = $scope.selectedStartDate;
                $scope.selectedStartDate = day;
            } else if (day.date > $scope.selectedStartDate.date) {
                $scope.selectedEndDate = day;
            }

            colorSelectedDateRange();

        };

        var setStartDate = function (day) {

            $scope.selectedStartDate = day;
            day.selectMode = 'daily';

        };

        /**
         * Function to execute to determine whether to set start date, end date,
         * or reset the calendar
         *
         * @param {object} day - A meta date object
         */
        $scope.setDayClick = function (day) {

            if (day.isUnavailable) {
                return;
            }

            if (isNoneSelected()) {

                setStartDate(day);

            } else if (isStartDateSelected()) {

                setEndDate(day);

            } else if (isBothSelected()) {

                resetCalendar(day);

            }

        };

        $scope.monthArray = generateMonthArray();

        // Allow to show the calendar or hide it
        $scope.calendarEnabled = false;

        /**
         * Function to show the calendar or hide it
         */
        $scope.enableCalendar = function () {
            $scope.calendarEnabled = !$scope.calendarEnabled;
        };

        $scope.applyCalendar = function () {
            $scope.currentSelectedStartDate = $scope.selectedStartDate;
            $scope.currentSelectedEndDate = $scope.selectedEndDate;
            $scope.calendarEnabled = false;
        };

        $scope.cancel = function () {
            discolorSelectedDateRange();
            $scope.selectedStartDate = $scope.currentSelectedStartDate;
            $scope.selectedEndDate = $scope.currentSelectedEndDate;

            /**
             * Edge case, if the current selected start date is empty, then it
             * means the selected end date should be null too
             */
            if (!$scope.currentSelectedStartDate) {
                $scope.selectedEndDate = null;
            }

            if ($scope.selectedStartDate && $scope.selectedEndDate) {
                colorSelectedDateRange();
            }

            $scope.calendarEnabled = false;
        };

        /**
         * Function that add a new month into the month array, remove the last
         * month at the same time
         */
        $scope.nextMonth = function () {

            var lastMonth = $scope.monthArray[$scope.monthArray.length - 1],
                middleWeek = lastMonth[2],
                middleDateOfMonth = middleWeek[6],
                year = middleDateOfMonth.date.getFullYear(),
                month = middleDateOfMonth.date.getMonth(),
                newMonth = month + 1;

            // Bigger than 11 means moving to next year
            if (newMonth > 11) {
                newMonth = newMonth % 12;
                year = year + 1;
            }

            var newMonthArray = generateDayArray(year, newMonth);

            $scope.monthArray.shift();
            $scope.monthArray.push(newMonthArray);

            $scope.monthNames.shift();
            $scope.monthNames.push(MONTH_NAME[newMonth] + ' ' + year);
            discolorSelectedDateRange();

            // Remember to color current selected start and end dates
            if ($scope.selectedStartDate && $scope.selectedEndDate) {
                colorSelectedDateRange();
            }

        };

        /**
         * Function that add a new month to the month array. The month is the
         * previous month of the lowest month in the array.
         */
        $scope.previousMonth = function () {

            var firstMonth = $scope.monthArray[0],
                middleWeek = firstMonth[2],
                middleDateOfMonth = middleWeek[6],
                year = middleDateOfMonth.date.getFullYear(),
                month = middleDateOfMonth.date.getMonth(),
                newMonth = month - 1;

            // Lower than 0 means moving backward to previous year
            if (newMonth < 0) {
                newMonth = 11;
                year = year - 1;
            }

            var newMonthArray = generateDayArray(year, newMonth);

            $scope.monthArray.pop();
            $scope.monthArray.unshift(newMonthArray);

            $scope.monthNames.pop();
            $scope.monthNames.unshift(MONTH_NAME[newMonth] + ' ' + year);

            discolorSelectedDateRange();

            if ($scope.selectedStartDate && $scope.selectedEndDate) {
                colorSelectedDateRange();
            }
        };

        /**
         * Function to set the default selection if the user specify a default
         * prior button
         */
        var setDefaultRange = function () {

            var defaultRange = null;

            $scope.priorButtons = $scope.priorRangePresets();

            for (var i = 0; i < $scope.priorButtons.length; i++) {

                var priorRange = $scope.priorButtons[i];

                if (priorRange.isDefault) {
                    defaultRange = priorRange;
                    break;
                }
            }

            if (defaultRange) {

                var endDate = new Date(),
                    startDate = new Date();

                endDate = generateMetaDateObject(endDate, endDate.getMonth());

                startDate.setDate(startDate.getDate() - defaultRange.value);

                startDate = generateMetaDateObject(startDate, startDate.getMonth());

                setStartDate(startDate);
                setEndDate(endDate);

                $scope.currentSelectedEndDate = endDate;
                $scope.currentSelectedStartDate = startDate;
            }
        };

        $scope.selectedStartDate = null;
        $scope.selectedEndDate = null;
        $scope.currentSelectedStartDate = null;
        var currentDate = new Date();
        $scope.currentSelectedEndDate = generateMetaDateObject(currentDate, currentDate.getMonth());

        $scope.priorButtons = null;

        /**
         * Function to allow the prior buttons to set the end date by using a
         * range from the current date
         *
         * @param {object} range - A range object to be set
         */
        $scope.selectRange = function (range) {

            discolorSelectedDateRange();

            var tempDate = new Date(),
                startDate = new Date(tempDate.toLocaleDateString()),
                endDate = new Date(tempDate.toLocaleDateString());

            setStartDate(generateMetaDateObject(startDate, startDate.getMonth()));

            endDate.setDate(endDate.getDate() - range.value);

            setEndDate(generateMetaDateObject(endDate, endDate.getMonth()));

        };

        if ($scope.priorRangePresets()) {
            setDefaultRange();
        }


    }])
    .directive('turnCalendar', function () {

        return {
            restrict: 'AE',
            scope: {
                startingMonth: '=',
                startingYear: '=',
                backwardMonths: '=',
                forwardMonths: '=',
                useMonday: '=',
                weeklySelectRange: '=',
                monthlySelectRange: '=',
                minSelectDate: '=',
                maxSelectDate: '=',
                priorRangePresets: '&',
                monthName: '&',
                dayName: '&'
            },
            controller: 'CalendarController',
            templateUrl: 'turnCalendar.html'
        };

    });