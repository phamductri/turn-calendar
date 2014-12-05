/**
 * @ngdoc directive
 * @name calendar
 * @restrict E
 *
 * @description
 * An AngularJS directive that allows a calendar to be display when embedded.
 *
 * Allow the following options :
 *
 * @param {number} startingMonth - Optional. The STARTING month of the calendar,
 * if not specify will use the current month. January is count as 0, February is
 * 1, and so on.
 *
 * @param {number} startingYear - Optional. The STARTING year of the calendar,
 * if not specify will use the current year.
 *
 * @param {number} backwardMonths - Optional. The number of calendar instances
 * of previous months count from the STARTING month instance, notice the s. For
 * example, if the STARTING month is September, and you want to display July and
 * August in your calendar pop up, set backwardMonths=2. Maximum allowed value
 * is 6. Minimum allowed is 1. If you don't set anything or setting values not
 * in allowed range, there won't be any backward months to display (i.e default
 * value is 0).
 *
 * @param {number} forwardMonths - Optional. The number of calendar instances
 * of next months count from the STARTING instance, notice the s at the end. For
 * example: STARTING month is September, and you want to display October and
 * November, set forwardMonths=2. Maximum allowed value is 6. Minimum allowed
 * is 1. If you don't set anything or setting values not in allowed range, there
 * won't be any forward months to display (i.e default value is 0).
 *
 * @param {number} startDayOfWeek - Optional. Allow the ability to set any day
 * of the week as the first day of week. Use 0 for Sunday, 1 for Monday, so on.
 * Default is 0.
 *
 * @param {string|number} minSelectDate - Optional. The minimum date which any
 * dates which are earlier than that date will not be able to be selected, accept
 * a string in MM-DD-YYYY or MM/DD/YYYY format, or a Unix timestamp.
 *
 * @param {string|number} maxSelectDate - Optional. The maximum date which any dates
 * which are later than that date will not be able to be selected, accept a string
 * in MM-DD-YYYY or MM/DD/YYYY format, or a Unix timestamp.
 *
 * @param {number} weeklySelectRange - Optional. A number in which if the hovered
 * (or selected) CURRENT date is beyond the LAST selected date, the mouse pointer
 * will change to WEEKLY hover/selected mode. If this or monthlySelectChange is
 * not specified, the default mode is daily.
 *
 * @param {number} monthlySelectRange - Optional. A number in which if the hovered
 * (or selected) CURRENT date is beyond the LAST selected date, the mouse pointer
 * will change to MONTHLY hover/selected mode. If this or weeklySelectRange is
 * not specified, the default mode is daily.
 *
 * @param {array<object>} priorRangePresets - Optional. An array of object that
 * specify the range buttons to appear for user to select prior range from the
 * CURRENT date. If you want a pre-selected range add a property called isDefault: true.
 * The object MUST have a property called 'value' to display it. 'value' is a
 * number. 'value' is a range that will allow the user to select date range from
 * CURRENT date once clicked. The range will conform with minSelectDate, maxSelectDate,
 * weeklySelectDate, monthlySelectDate parameters if these parameters are set.
 * If you currently in a different month view, clicking on any of the prior button
 * will reset your current view back to the CURRENT month. Example :
 * [{value: 20, isDefault: true}, {value: 45}, {value : 90}]
 *
 * @param {string} maxForwardMonth - Optional. Setting the max month which the
 * NEXT button allowed to work. Format is MM/YYYY. January starts as 0. This setting
 * will override the setting in forwardMonths. For example, you set the starting
 * month as August 2013, with forwardMonths is 3, maxForwardMonth is 10/2013, your
 * calendar will miss the month November 2013, because it exceeds the maxForwardMonth.
 *
 * @param {string} minBackwardMonth - Optional. Setting the min month which the
 * PREVIOUS button allowed to work. Format is MM/YYYY . January start as 0. This
 * setting will override the setting in backwardMonths. For example, you set the
 * base month to be March 2014, with backwardMonths to be 3. You also set minBackwardMonths
 * to be 1/2014. The calendar will not display January 2014, and Dec 2013, since
 * minBackwardMonths override backwardMonths. Attempt to press PREVIOUS button
 * won't work either.
 *
 * @param {string|number} startDate - Optional. Set the start date to be selected
 * on the calendar. Accept dateString or Unix timestamp. Set this as a directive
 * attribute if you want to be able to set this value in real time. This is the
 * directive to use if you want to read the current selected start date. If
 * minSelectDate is set, and startDate falls into a date that is earlier than
 * minSelectDate, the startDate will be pumped up until it reaches a day that is
 * not conflicted with minSelectDate.
 *
 * @param {string|number} endDate - Optional. Set the end date to be selected on
 * the calendar. Accept dateString or Unix timestamp. Set this value as directive
 * attribute if you want to be able to set this value in real time. This is the
 * directive to use if you want to read the current selected end date. If maxSelectDate
 * is set, and this endDate falls into a date that is later than maxSelectDate,
 * endDate will be going backward till it reaches a date that is not conflicted
 * with maxSelectDate.
 *
 * @param {function} applyCallback - Optional. A callback function to call when
 * the "Apply" button is pressed.
 *
 * @param {string} selectionMode - Optional. The selection behavior of the calendar.
 * Support two options for now. Default selection mode is 'twoClick', where the
 * selected start date and end date is cleared out every time the user try a new
 * selection. The other mode is 'lastSelectedDate', where the cursor will jump
 * based on the previous selected date.
 *
 * All of the above options can be set through an option object. Pass in the option
 * object through attribute calendarOptions. If you set the same setting in attribute
 * and in option object, the value set in attribute will used over the value in
 * option object.
 *
 * Real time update for following options are supported : startDate, endDate,
 * minSelectDate, maxSelectDate, minBackwardMonth, maxForwardMonth, forwardMonths,
 * backwardMonths. These options have to set through attributes for real time
 * tracking to work. Setting through options object will not work.
 *
 * @example
 *
 * <turn-calendar start-day-of-week="1" starting-month="11" starting-year="2013"
 *                forward-months="3" backward-months="3" min-select-date="'09/13/2013'"
 *                weekly-select-range="30" monthly-select-range="60"
 *                prior-range-presets="[{value: 20, isDefault: true}, {value: 45}, {value : 90}]"
 *                max-forward-month="'10/2014'">
 * <turn-calendar>
 *
 * The above code snippet will display 7 months instance, starting from Sep 2013
 * to March 2014, with Monday as the starting day of the week, the base month is
 * Dec 2013, it will change to weekly select mode if the cursor is 30 days beyond
 * the last selected date, monthly select mode if cursor is 60 days beyond the last
 * selected date. It will display 3 prior buttons: 20, 45, 90, with 25 is pre-selected
 * from the CURRENT date. Anything before 09/13/2013 is not available for selection.
 * Any month above Nov of the year 2014 is not allowed.
 *
 * @author Tri Pham <tri.pham@turn.com>
 */
angular.module('turn/calendar', ['calendarTemplates']).constant('turnCalendarDefaults', {
  monthName: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],
  dayName: [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa'
  ],
  startingMonth: new Date().getMonth(),
  startingYear: new Date().getFullYear(),
  startDayOfWeek: 0
}).constant('MAX_MONTHS_ALLOWED', 6).constant('MIN_MONTHS_ALLOWED', 1).service('turnCalendarService', [
  'MAX_MONTHS_ALLOWED',
  'MIN_MONTHS_ALLOWED',
  function (MAX_MONTHS_ALLOWED, MIN_MONTHS_ALLOWED) {
    return {
      isMonthValid: function (month) {
        return month && month >= MIN_MONTHS_ALLOWED && month <= MAX_MONTHS_ALLOWED;
      },
      convertToDateObject: function (monthValue) {
        if (!monthValue) {
          return null;
        }
        const splitArray = monthValue.split('/');
        if (!splitArray.length) {
          return null;
        }
        var month = splitArray[0], year = splitArray[1];
        return new Date(year, month, 1);
      },
      arraySplit: function (array, size) {
        var arrays = [];
        while (array.length > 0) {
          arrays.push(array.splice(0, size));
        }
        return arrays;
      },
      validateDateInput: function (date) {
        if (!date) {
          return false;
        }
        var dateObj = new Date(date);
        if (Object.prototype.toString.call(dateObj) !== '[object Date]')
          return false;
        return !isNaN(dateObj.getTime());
      }
    };
  }
]).controller('CalendarController', [
  '$scope',
  '$attrs',
  'turnCalendarDefaults',
  'turnCalendarService',
  '$document',
  function ($scope, $attrs, turnCalendarDefaults, turnCalendarService, $document) {
    /**
         * Note : selectedStartDate and selectedEndDate are meta date object to track
         * internal cursor movement.
         * 
         * allowMonthGeneration will allow generation of month in some edge cases:
         * 1) prior range click
         * 2) dynamically updating maxSelectDate and minSelectDate
         * In above cases if we don't bypass month generation, less instance of
         * month will be displayed than expected.
         */
    var self = this, calendarOptions, MONTH_NAME, selectedStartDate, selectedEndDate, allowMonthGeneration = false;
    $scope.isBothDateSelected = true;
    if ($attrs.calendarOptions) {
      calendarOptions = $scope.$parent.$eval($attrs.calendarOptions);
    }
    /**
         * Helper function to pick the value from either attribute or from config
         * object.
         *
         * @param {string} property The property to be read from attribute setting or
         * from a config object, if set in both attribute and config, the attribute
         * value will be use
         * @returns {*} The value
         */
    var pickValue = function (property) {
      if (angular.isDefined($attrs[property])) {
        return $scope.$parent.$eval($attrs[property]) || $attrs[property];
      }
      if (angular.isDefined(calendarOptions) && calendarOptions[property]) {
        return calendarOptions[property];
      }
      if (turnCalendarDefaults[property]) {
        return turnCalendarDefaults[property];
      }
      return null;
    };
    // Configuration attributes
    angular.forEach([
      'startingMonth',
      'startingYear',
      'backwardMonths',
      'forwardMonths',
      'startDayOfWeek',
      'minSelectDate',
      'maxSelectDate',
      'weeklySelectRange',
      'monthlySelectRange',
      'priorRangePresets',
      'maxForwardMonth',
      'minBackwardMonth',
      'startDate',
      'endDate',
      'selectionMode'
    ], function (key) {
      self[key] = pickValue(key);
    });
    angular.forEach([
      'minSelectDate',
      'maxSelectDate'
    ], function (key) {
      $scope.$watch(key, function (newVal) {
        if (!turnCalendarService.validateDateInput(newVal)) {
          return;
        }
        self[key] = newVal;
        allowMonthGeneration = true;
        $scope.monthArray = generateMonthArray(null, null);
        allowMonthGeneration = false;
        if (!selectedStartDate || !selectedEndDate) {
          return;
        }
        var startDate = resetStartDate(selectedStartDate.date), endDate = resetEndDate(selectedEndDate.date);
        selectedStartDate = generateMetaDateObject(startDate, startDate.getMonth());
        selectedEndDate = generateMetaDateObject(endDate, endDate.getMonth());
        discolorSelectedDateRange();
        colorSelectedDateRange();
      });
    });
    angular.forEach([
      'minBackwardMonth',
      'maxForwardMonth'
    ], function (key) {
      $scope.$watch(key, function (newVal) {
        if (!turnCalendarService.convertToDateObject(newVal)) {
          return;
        }
        self[key] = newVal;
      });
    });
    angular.forEach([
      'forwardMonths',
      'backwardMonths'
    ], function (key) {
      $scope.$watch(key, function (newVal) {
        if (!turnCalendarService.isMonthValid(newVal)) {
          return;
        }
        self[key] = newVal;
        $scope.monthArray = generateMonthArray(null, null);
        if (isBothSelected()) {
          discolorSelectedDateRange();
          colorSelectedDateRange();
        }
      });
    });
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
    $scope.DAYS_IN_WEEK = 7;
    /**
         * Number of months in a year
         *
         * @type {number}
         */
    const MONTHS_IN_YEAR = 12;
    /**
         * An array which will contains the month name with year to display on
         * the template
         *
         * @type {array}
         */
    $scope.monthNames = MONTH_NAME = turnCalendarDefaults.monthName;
    /**
         * An array which contains the name of day of week, to be displayed
         * by template
         *
         * @type {array}
         */
    $scope.dayNames = [];
    var tempDayName = turnCalendarDefaults.dayName.slice(0), dayRemained = tempDayName.splice(self.startDayOfWeek);
    $scope.dayNames = dayRemained.concat(tempDayName);
    /**
         * A helper function to determine how many day we should go back from the
         * first day of the month so that it fits the start day of week set by
         * user
         *
         * @param {number} startDayOfWeek Start day of week chosen by user
         * @param {number} firstDayOfMonth The day index of the week of the first
         * day of month
         * @returns {number} A number to indicate how many days we should go
         * backward from the first day of the month to fit in the week that has
         * an arbitrary start day
         */
    var generateFirstDateIndex = function (startDayOfWeek, firstDayOfMonth) {
      var firstDayIndex = 0 - ($scope.DAYS_IN_WEEK - 1 - startDayOfWeek - (0 - firstDayOfMonth));
      return firstDayIndex < -7 ? firstDayIndex + 7 : firstDayIndex;
    };
    var isExceedMaxMonth = function (month, year) {
      return self.maxForwardMonth && turnCalendarService.convertToDateObject(self.maxForwardMonth) && new Date(year, month, 1) > turnCalendarService.convertToDateObject(self.maxForwardMonth);
    };
    /**
         * Add the number of forward months into base month
         *
         * @param {array} monthArray - The current month array
         * @param {number} month - The month to be added
         * @param {year} year - The year of the month to be added
         */
    var setForwardMonths = function (monthArray, month, year) {
      if (!turnCalendarService.isMonthValid(self.forwardMonths)) {
        return;
      }
      var yearReset = false;
      for (var i = 1; i <= self.forwardMonths; i++) {
        var newMonth = month + i;
        // Bigger than 11 means moving to next year
        if (newMonth > 11) {
          newMonth = newMonth % MONTHS_IN_YEAR;
          if (!yearReset) {
            year = year + 1;
            yearReset = true;
          }
        }
        if (isExceedMaxMonth(newMonth, year) && !allowMonthGeneration) {
          return;
        }
        monthArray.push(generateDayArray(year, newMonth));
        $scope.monthNames.push(MONTH_NAME[newMonth]);
      }
    };
    var isBelowMinMonth = function (month, year) {
      return self.minBackwardMonth && turnCalendarService.convertToDateObject(self.minBackwardMonth) && new Date(year, month, 1) < turnCalendarService.convertToDateObject(self.minBackwardMonth);
    };
    /**
         * Add the backward months into the base month
         *
         * @param {array} monthArray - The month array
         * @param {number} month - The month to be added
         * @param {number} year - The year to be added
         */
    var setBackwardMonths = function (monthArray, month, year) {
      if (!turnCalendarService.isMonthValid(self.backwardMonths)) {
        return;
      }
      var yearReset = false, newMonthCount = 0;
      for (var i = 1; i <= self.backwardMonths; i++) {
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
        if (isBelowMinMonth(newMonth, year) && !allowMonthGeneration) {
          return;
        }
        monthArray.unshift(generateDayArray(year, newMonth));
        $scope.monthNames.unshift(MONTH_NAME[newMonth]);
      }
    };
    /**
         * Function to generate an array that contains several months per specify
         * by the config from user. By default the year and month will be set
         * according to config values. If there is an input year and an input
         * month from internal calls the year and month setting from config will
         * be overridden
         *
         * @param {number} inputYear - Input year as base year
         * @param {number} inputMonth - Input month as base month
         * @returns {array} The array that contains all the months to be displayed
         */
    var generateMonthArray = function (inputYear, inputMonth) {
      var year = self.startingYear, month = self.startingMonth;
      if (inputYear) {
        year = inputYear;
      }
      if (inputMonth) {
        month = inputMonth;
      }
      var baseMonth = generateDayArray(year, month), monthArray = [];
      monthArray.push(baseMonth);
      // Reset the month names
      $scope.monthNames = [MONTH_NAME[month]];
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
      var firstDayOfMonth = new Date(year, month, 1), dayOfWeek = firstDayOfMonth.getDay(), firstDate;
      firstDate = new Date(firstDayOfMonth.setDate(generateFirstDateIndex(self.startDayOfWeek, dayOfWeek)));
      return firstDate;
    };
    /**
         * Function to generate the full 42 day to be shown on the calendar
         *
         * @param {number} year - The year to be shown
         * @param {number} month - The month to be shown
         * @returns {array} A 2 dimension array contains the weeks to be shown
         */
    var generateDayArray = function (year, month) {
      var currentDate = new Date(getFirstDate(year, month)), dayArray = [];
      for (var i = 0; i < MAX_DAY; i++) {
        dayArray.push(generateMetaDateObject(new Date(currentDate), month));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return turnCalendarService.arraySplit(dayArray, $scope.DAYS_IN_WEEK);
    };
    /**
         * Detect if the date in question compatible with minSelectDate
         * or maxSelectDate
         *
         * @param {object} date - The date in question
         * @returns {boolean} - True if compatible, false if not
         */
    var isUnavailable = function (date) {
      return self.minSelectDate && date < new Date(self.minSelectDate) || self.maxSelectDate && date > new Date(self.maxSelectDate);
    };
    /**
         * Function that determine if the current day exceeds the selected range,
         * either weekly select range or monthly select range
         *
         * @param {number} selectRange - The range to determine whether the day
         * is exceeding the range
         * @param {number} compareRange - An optional second range, to determine
         * if the day is sandwiched between two range or not
         * @param {object} baseDay - The base day which we compare against
         * @param {object} day - The day in question
         * @returns {boolean} True if exceeds or is between the two range, false
         * if not
         */
    var isDateExceedSelectedRange = function (selectRange, compareRange, baseDay, day) {
      if (!selectRange || !day || day.isUnavailable || !lastSelectedDate) {
        return false;
      }
      var selectDateForward = new Date(baseDay.date.toLocaleDateString()), selectDateBackward = new Date(baseDay.date.toLocaleDateString());
      selectDateForward.setDate(selectDateForward.getDate() + selectRange);
      selectDateBackward.setDate(selectDateBackward.getDate() - selectRange);
      if (compareRange) {
        var compareRangeForward = new Date(lastSelectedDate.date.toLocaleDateString()), compareRangeBackward = new Date(lastSelectedDate.date.toLocaleDateString());
        compareRangeForward.setDate(compareRangeForward.getDate() + compareRange);
        compareRangeBackward.setDate(compareRangeBackward.getDate() - compareRange);
        if (compareRange > selectRange) {
          return day.date > selectDateForward && day.date < compareRangeForward || day.date > compareRangeBackward && day.date < selectDateBackward;
        }
      }
      return day.date > selectDateForward || day.date < selectDateBackward;
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
              return day && day.date && day.date.toLocaleDateString() === selectedDay.date.toLocaleDateString();
            });
          });
        if (monthFound) {
          setMonthValue(month, isHover, hoverValue, selectMode);
        }
        return monthFound;
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
      var weekFound = false;
      for (var i = 0; i < $scope.monthArray.length; i++) {
        var month = $scope.monthArray[i];
        for (var j = 0; j < month.length; j++) {
          var week = month[j];
          for (var k = 0; k < week.length; k++) {
            var day = week[k];
            if (day && day.date && day.date.toLocaleDateString() === selectedDay.date.toLocaleDateString()) {
              weekFound = true;
            }
            if (weekFound) {
              setWeekValue(week, isHover, hoverValue, selectMode);
              /**
                             * Edge case, empty day means this week is the first week
                             * of the month, it means we have to colorize the last week
                             * of previous month.
                             */
              if (!week[0].date && i > 0) {
                var lastMonth = $scope.monthArray[i - 1], lastWeekOfLastMonth = lastMonth[lastMonth.length - 1];
                /**
                                 * Another edge case, since the month contains 42 days, if the
                                 * first day of this last week is empty means the whole week is
                                 * all empty day, pick the week before this one.
                                 */
                if (!lastWeekOfLastMonth[0].date) {
                  lastWeekOfLastMonth = lastMonth[lastMonth.length - 2];
                }
                setWeekValue(lastWeekOfLastMonth, isHover, hoverValue, selectMode);
              }
              /**
                             * Edge case, if the last date of the week is empty, means
                             * it has to go to the first week of next month
                             */
              if (!week[$scope.DAYS_IN_WEEK - 1].date && i < $scope.monthArray.length - 1) {
                var nextMonth = $scope.monthArray[i + 1], firstWeekOfNextMonth = nextMonth[0];
                setWeekValue(firstWeekOfNextMonth, isHover, hoverValue, selectMode);
              }
              break;
            }
          }
          if (weekFound) {
            break;
          }
        }
        if (weekFound) {
          break;
        }
      }
    };
    var isTwoClickSelectionMode = function () {
      return !self.selectionMode || self.selectionMode && self.selectionMode === 'twoClick';
    };
    /**
         * Function to determine whether to hover the cell or not
         *
         * @param {object} day - The day in question
         */
    $scope.mouseEnter = function (day) {
      if (!day.date || day.isUnavailable) {
        day.isHover = false;
        return;
      }
      if (!selectedStartDate) {
        day.isHover = true;
        return;
      }
      if (isBothSelected() && isTwoClickSelectionMode) {
        day.isHover = true;
        return;
      }
      var comparedDate;
      switch (self.selectionMode) {
      case 'lastSelectedDate':
        comparedDate = lastSelectedDate;
        break;
      default:
        comparedDate = selectedStartDate;
      }
      // Either monthly or weekly selection is possible(not both)
      if (isDateExceedSelectedRange(self.monthlySelectRange, null, comparedDate, day)) {
        paletteTheMonth(day, true, true, '');
        return;
      } else if (isDateExceedSelectedRange(self.weeklySelectRange, null, comparedDate, day)) {
        paletteTheWeek(day, true, true, '');
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
      if (!selectedStartDate) {
        day.isHover = false;
        return;
      }
      if (isBothSelected() && isTwoClickSelectionMode) {
        day.isHover = false;
        return;
      }
      var comparedDate;
      switch (self.selectionMode) {
      case 'lastSelectedDate':
        comparedDate = lastSelectedDate;
        break;
      default:
        comparedDate = selectedStartDate;
      }
      // Either monthly or weekly selection is possible(not both)
      if (isDateExceedSelectedRange(self.monthlySelectRange, null, comparedDate, day)) {
        paletteTheMonth(day, true, false, '');
        return;
      } else if (isDateExceedSelectedRange(self.weeklySelectRange, null, comparedDate, day)) {
        paletteTheWeek(day, true, false, '');
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
    /**
         * Helper function to determine the current cursor mode, notice that the
         * current cursor mode depends SOLELY on the current position of the
         * START date and END date only.
         *
         * @returns {boolean} True if daily cursor mode, false if not
         */
    var isDaily = function () {
      return !self.weeklySelectRange && !self.monthlySelectRange || !isDateExceedSelectedRange(self.weeklySelectRange, self.monthlySelectRange, selectedStartDate, selectedEndDate) && !isDateExceedSelectedRange(self.weeklySelectRange, self.monthlySelectRange, selectedStartDate, selectedEndDate);
    };
    /**
         * Determine if the date is between selected start date and end date
         *
         * @param {object} date - The date in question
         * @returns {boolean} True if between, false if not
         */
    var isBetweenStartAndEndDate = function (date) {
      return date.setHours(0, 0, 0, 0) <= selectedEndDate.date.setHours(0, 0, 0, 0) && date.setHours(0, 0, 0, 0) >= selectedStartDate.date.setHours(0, 0, 0, 0);
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
              if (isDateExceedSelectedRange(self.weeklySelectRange, self.monthlySelectRange, selectedStartDate, selectedEndDate)) {
                day.selectMode = 'weekly';
              }
              if (isDateExceedSelectedRange(self.monthlySelectRange, self.weeklySelectRange, selectedStartDate, selectedEndDate)) {
                day.selectMode = 'monthly';
              }
            }
          });
        });
      });
      // Selection mode can be either monthly or weekly (both is not possible)
      if (isDateExceedSelectedRange(self.monthlySelectRange, self.weeklySelectRange, selectedStartDate, selectedEndDate)) {
        // Color the entire month, not just the selected end date
        paletteTheMonth(selectedStartDate, false, false, 'monthly');
        paletteTheMonth(selectedEndDate, false, false, 'monthly');
      } else if (isDateExceedSelectedRange(self.weeklySelectRange, self.monthlySelectRange, selectedStartDate, selectedEndDate)) {
        // Color the entire end week, not just the selected end date
        paletteTheWeek(selectedStartDate, false, false, 'weekly');
        paletteTheWeek(selectedEndDate, false, false, 'weekly');
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
    var isBothSelected = function () {
      return selectedStartDate && selectedEndDate;
    };
    var isNoneSelected = function () {
      return !selectedStartDate && !selectedEndDate;
    };
    var isStartDateSelected = function () {
      return selectedStartDate && !selectedEndDate;
    };
    var setEndDate = function (day) {
      if (day.date < selectedStartDate.date) {
        selectedEndDate = selectedStartDate;
        selectedStartDate = day;
      } else if (day.date > selectedStartDate.date) {
        selectedEndDate = day;
      }
      snapDateToMonthlyWeekly();
      $scope.startDateString = selectedStartDate.date.toLocaleDateString();
      $scope.endDateString = selectedEndDate.date.toLocaleDateString();
      colorSelectedDateRange();
      colorizePriorButtons();
      $scope.isBothDateSelected = true;
    };
    /**
         * Snaps selected start/end date in case of monthly and weekly selection mode 
         */
    var snapDateToMonthlyWeekly = function () {
      var updatedStartDate, updatedEndDate, isValueUpdated = false, dayDiff = Math.round((selectedEndDate.date.getTime() - selectedStartDate.date.getTime()) / 86400000);
      if (dayDiff > self.monthlySelectRange) {
        updatedStartDate = new Date(selectedStartDate.date.getFullYear(), selectedStartDate.date.getMonth(), 1);
        updatedEndDate = new Date(selectedEndDate.date.getFullYear(), selectedEndDate.date.getMonth() + 1, 0);
        isValueUpdated = true;
      } else if (dayDiff > self.weeklySelectRange) {
        updatedStartDate = new Date(selectedStartDate.date.setDate(selectedStartDate.date.getDate() - (7 + selectedStartDate.date.getDay() - self.startDayOfWeek) % 7));
        updatedEndDate = new Date(selectedEndDate.date.setDate(selectedEndDate.date.getDate() - (7 + selectedEndDate.date.getDay() - self.startDayOfWeek) % 7) + 6 * 86400000);
        isValueUpdated = true;
      }
      if (isValueUpdated) {
        if (updatedStartDate && isUnavailable(updatedStartDate)) {
          updatedStartDate = new Date(self.minSelectDate);
        }
        if (updatedEndDate && isUnavailable(updatedEndDate)) {
          updatedEndDate = new Date(self.maxSelectDate);
        }
        selectedStartDate.date = updatedStartDate;
        selectedEndDate.date = updatedEndDate;
      }
    };
    var setStartDate = function (day) {
      selectedStartDate = day;
      $scope.startDateString = selectedStartDate.date.toLocaleDateString();
      day.selectMode = 'daily';
      $scope.isBothDateSelected = false;
    };
    var lastSelectedDate = null;
    /**
         * Util function to swap start date and end date if the end date is less
         * than start date
         */
    var swapDate = function () {
      if (selectedEndDate.date < selectedStartDate.date) {
        var tempDay = selectedStartDate;
        selectedStartDate = selectedEndDate;
        selectedEndDate = tempDay;
      }
    };
    /**
         * Reset the selection of start date, end date based on last selected
         * start date that has been recorded
         *
         * @param {object} day - The day being clicked on
         */
    var resetSelectionLastSelectedMode = function (day) {
      if (!lastSelectedDate) {
        lastSelectedDate = selectedEndDate;
      }
      if (selectedStartDate.date.toLocaleString() === lastSelectedDate.date.toLocaleString()) {
        selectedEndDate = day;
      } else if (selectedEndDate.date.toLocaleString() === lastSelectedDate.date.toLocaleString()) {
        selectedStartDate = day;
      }
      swapDate();
      snapDateToMonthlyWeekly();
      $scope.startDateString = selectedStartDate.date.toLocaleDateString();
      $scope.endDateString = selectedEndDate.date.toLocaleDateString();
      discolorSelectedDateRange();
      colorSelectedDateRange();
      lastSelectedDate = day;
    };
    /**
         * Clear the calendar of hover and selected days, reset the start date
         * to the newly selected date
         *
         * @param {object} day - The new start date
         */
    var resetSelectionTwoClickMode = function (day) {
      selectedEndDate = null;
      discolorSelectedDateRange();
      selectedStartDate = day;
      colorDateInMonth(day.date);
      $scope.isBothDateSelected = false;
    };
    var resetDayClick = function (day) {
      // Default is two click mode
      switch (self.selectionMode) {
      case 'lastSelectedDate':
        resetSelectionLastSelectedMode(day);
        break;
      default:
        resetSelectionTwoClickMode(day);
      }
    };
    /**
         * Function to execute to determine whether to set start date, end date,
         * or reset the calendar
         *
         * @param {object} day - A meta date object
         */
    $scope.setDayClick = function (date) {
      var day = angular.copy(date);
      if (day.isUnavailable || !day.date) {
        return;
      }
      if (isNoneSelected()) {
        setStartDate(day);
      } else if (isStartDateSelected()) {
        setEndDate(day);
      } else if (isBothSelected()) {
        resetDayClick(day);
      }
    };
    $scope.monthArray = generateMonthArray(null, null);
    // Allow to show the calendar or hide it
    $scope.calendarEnabled = false;
    /**
         * Function to show the calendar or hide it
         */
    $scope.enableCalendar = function () {
      $scope.calendarEnabled = !$scope.calendarEnabled;
      colorizePriorButtons();
    };
    /**
         * This code will check for day difference of prior button and if any matching range found,
         * active style will be applied to that button
         */
    var colorizePriorButtons = function () {
      $scope.selectedPriorButtonIndex = null;
      var endDate = self.maxSelectDate ? new Date(self.maxSelectDate) : new Date();
      var dayDiff = Math.round((endDate.setHours(0, 0, 0, 0) - selectedStartDate.date.setHours(0, 0, 0, 0)) / 86400000);
      angular.forEach($scope.priorButtons, function (rangePreset, index) {
        if (rangePreset.value - 1 === dayDiff) {
          $scope.selectedPriorButtonIndex = index;
        }
      });
    };
    var setStartEndDate = function () {
      if (angular.isDefined($attrs.startDate) && selectedStartDate) {
        if (isNaN($scope.$parent.$eval($attrs.startDate))) {
          $scope.startDate = selectedStartDate.date.toLocaleString();
        } else {
          $scope.startDate = selectedStartDate.date.getTime();
        }
      }
      if (angular.isDefined($attrs.endDate) && selectedEndDate) {
        if (isNaN($scope.$parent.$eval($attrs.endDate))) {
          $scope.endDate = selectedEndDate.date.toLocaleString();
        } else {
          $scope.endDate = selectedEndDate.date.getTime();
        }
      }
    };
    $scope.applyCalendar = function () {
      if (!selectedEndDate) {
        return;
      }
      $scope.calendarEnabled = false;
      setStartEndDate();
      $scope.currentSelectedStartDate = selectedStartDate;
      $scope.currentSelectedEndDate = selectedEndDate;
      if ($scope.applyCallback) {
        $scope.applyCallback();
      }
    };
    $scope.cancel = function () {
      discolorSelectedDateRange();
      selectedStartDate = $scope.currentSelectedStartDate;
      selectedEndDate = $scope.currentSelectedEndDate;
      $scope.startDateString = selectedStartDate.date.toLocaleDateString();
      $scope.endDateString = selectedEndDate.date.toLocaleDateString();
      lastSelectedDate = selectedEndDate;
      /**
             * Edge case, if the current selected start date is empty, then it
             * means the selected end date should be null too
             */
      if (!$scope.currentSelectedStartDate) {
        selectedEndDate = null;
      }
      if (selectedStartDate && selectedEndDate) {
        colorSelectedDateRange();
      }
      $scope.calendarEnabled = false;
    };
    /**
         * Function to color just this exact date, the mode will always be daily
         *
         * @param {object} date The date object to be colored
         */
    var colorDateInMonth = function (date) {
      $scope.monthArray.forEach(function (month) {
        month.forEach(function (week) {
          week.forEach(function (day) {
            if (day && day.date && day.date.toLocaleString() === date.toLocaleString()) {
              day.selectMode = 'daily';
            }
          });
        });
      });
    };
    /**
         * Function that add a new month into the month array, remove the last
         * month at the same time
         */
    $scope.nextMonth = function () {
      var lastMonth = $scope.monthArray[$scope.monthArray.length - 1], middleWeek = lastMonth[2], middleDateOfMonth = middleWeek[6], year = middleDateOfMonth.date.getFullYear(), month = middleDateOfMonth.date.getMonth(), newMonth = month + 1;
      if (isExceedMaxMonth(newMonth, year)) {
        return;
      }
      // Bigger than 11 means moving to next year
      if (newMonth > 11) {
        newMonth = newMonth % MONTHS_IN_YEAR;
        year = year + 1;
      }
      var newMonthArray = generateDayArray(year, newMonth), allowedArraySize = 1;
      if (self.forwardMonths) {
        allowedArraySize += self.forwardMonths;
      }
      if (self.backwardMonths) {
        allowedArraySize += self.backwardMonths;
      }
      /**
             * This check if the current monthArray is equal to the maximum length
             * allowed by backwardMonths and forwardMonths setting. If it reaches
             * maximum then remove the last month.
             */
      if (allowedArraySize === $scope.monthArray.length) {
        $scope.monthArray.shift();
        $scope.monthNames.shift();
      }
      $scope.monthArray.push(newMonthArray);
      $scope.monthNames.push(MONTH_NAME[newMonth]);
      discolorSelectedDateRange();
      // Remember to color current selected start and end dates
      if (isBothSelected()) {
        colorSelectedDateRange();
      }
      if (isStartDateSelected()) {
        colorDateInMonth(selectedStartDate.date);
      }
    };
    /**
         * Function that add a new month to the month array. The month is the
         * previous month of the lowest month in the array.
         */
    $scope.previousMonth = function () {
      var firstMonth = $scope.monthArray[0], middleWeek = firstMonth[2], middleDateOfMonth = middleWeek[6], year = middleDateOfMonth.date.getFullYear(), month = middleDateOfMonth.date.getMonth(), newMonth = month - 1;
      if (isBelowMinMonth(newMonth, year)) {
        return;
      }
      // Lower than 0 means moving backward to previous year
      if (newMonth < 0) {
        newMonth = 11;
        year = year - 1;
      }
      var newMonthArray = generateDayArray(year, newMonth), allowedArraySize = 1;
      if (self.forwardMonths) {
        allowedArraySize += self.forwardMonths;
      }
      if (self.backwardMonths) {
        allowedArraySize += self.backwardMonths;
      }
      /**
             * This check if the current monthArray is equal to the maximum length
             * allowed by backwardMonths and forwardMonths setting. If it reaches
             * maximum then remove the first month.
             */
      if (allowedArraySize === $scope.monthArray.length) {
        $scope.monthArray.pop();
        $scope.monthNames.pop();
      }
      $scope.monthArray.unshift(newMonthArray);
      $scope.monthNames.unshift(MONTH_NAME[newMonth]);
      discolorSelectedDateRange();
      if (selectedStartDate && selectedEndDate) {
        colorSelectedDateRange();
      }
      if (isStartDateSelected()) {
        colorDateInMonth(selectedStartDate.date);
      }
    };
    selectedStartDate = null;
    selectedEndDate = null;
    $scope.currentSelectedStartDate = null;
    var currentDate = new Date();
    $scope.currentSelectedEndDate = generateMetaDateObject(currentDate, currentDate.getMonth());
    $scope.priorButtons = null;
    /**
         * Util function, if the end date falls into a date that is unavailable,
         * it will decrease the date till meet a date that's available
         *
         * @param {object} endDate The end date object
         * @returns {object} The end date object that is available
         */
    var resetEndDate = function (endDate) {
      var endDay = generateMetaDateObject(endDate, endDate.getMonth());
      /**
             * If end date is unavailable, going backward 1 day till seeing one
             * that is available
             */
      while (endDay.isUnavailable) {
        endDate.setDate(endDate.getDate() - 1);
        endDay = generateMetaDateObject(endDate, endDate.getMonth());
      }
      return endDate;
    };
    /**
         * Util function, if the start date falls into a date that is unavailable,
         * it will increase the date till meet a date that's available
         *
         * @param {object} startDate The start date object
         * @returns {object} The start date object that is available
         */
    var resetStartDate = function (startDate) {
      var startDay = generateMetaDateObject(startDate, startDate.getMonth());
      /**
             * If start date is unavailable, going forward 1 day till seeing one
             * that is available
             */
      while (startDay.isUnavailable) {
        startDate.setDate(startDate.getDate() + 1);
        startDay = generateMetaDateObject(startDate, startDate.getMonth());
      }
      return startDate;
    };
    /**
         * Function to allow the prior buttons to set the end date by using a
         * range from the current date
         *
         * @param {object} range - A range object to be set
         */
    $scope.selectRange = function (range, index) {
      $scope.selectedPriorButtonIndex = index;
      allowMonthGeneration = true;
      discolorSelectedDateRange();
      var startDate = self.maxSelectDate ? new Date(self.maxSelectDate) : new Date(), endDate = self.maxSelectDate ? new Date(self.maxSelectDate) : new Date();
      $scope.monthArray = generateMonthArray(endDate.getFullYear(), endDate.getMonth());
      startDate.setDate(startDate.getDate() - (range.value - 1));
      startDate = resetStartDate(startDate);
      var startDay = generateMetaDateObject(startDate, startDate.getMonth());
      setStartDate(startDay);
      endDate = resetEndDate(endDate);
      var endDay = generateMetaDateObject(endDate, endDate.getMonth());
      lastSelectedDate = selectedEndDate;
      setEndDate(endDay);
      allowMonthGeneration = false;
    };
    /**
         * Function to set the default selection if the user specify a default
         * prior button
         */
    var setDefaultRange = function () {
      var defaultRange = null;
      $scope.priorButtons = self.priorRangePresets;
      $scope.priorButtons.some(function (priorRange) {
        if (priorRange.isDefault) {
          defaultRange = priorRange;
        }
        return priorRange.isDefault;
      });
      if (!defaultRange) {
        return;
      }
      $scope.selectRange(defaultRange);
      $scope.currentSelectedEndDate = selectedEndDate;
      $scope.currentSelectedStartDate = selectedStartDate;
    };
    if (self.priorRangePresets) {
      setDefaultRange();
    }
    if (selectedStartDate) {
      $scope.startDateString = selectedStartDate.date.toLocaleDateString();
    }
    if (selectedEndDate) {
      $scope.endDateString = selectedEndDate.date.toLocaleDateString();
    }
    /**
         * Change start date when ng-change detects the user changing the start
         * date
         *
         * @param {object} day - Meta date object
         */
    var setStartDateString = function (day) {
      if (day.isUnavailable) {
        return;
      }
      discolorSelectedDateRange();
      var middleDateFirstMonth = $scope.monthArray[0][2][6], firstDateFirstMonth = new Date(middleDateFirstMonth.date.getFullYear(), middleDateFirstMonth.date.getMonth(), 1);
      if (day.date < firstDateFirstMonth) {
        $scope.monthArray = generateMonthArray(day.date.getFullYear(), day.date.getMonth());
      }
      setStartDate(day);
      $scope.endDate = day.date.toLocaleDateString();
      if (selectedEndDate && selectedEndDate.date > day.date) {
        colorSelectedDateRange();
      }
    };
    /**
         * Invoke by ng-change when user input start date string
         */
    $scope.changeStartDate = function () {
      if (!turnCalendarService.validateDateInput($scope.startDateString)) {
        return;
      }
      var newDate = new Date($scope.startDateString);
      setStartDateString(generateMetaDateObject(newDate, newDate.getMonth()));
    };
    /**
         * Change the end date, provoke by ng-change
         *
         * @param {object} day - The meta end date object
         */
    var setEndDateString = function (day) {
      if (day.isUnavailable) {
        return;
      }
      if (selectedStartDate && selectedStartDate.date > day.date) {
        return;
      }
      selectedEndDate = day;
      $scope.endDate = day.date.toLocaleDateString();
      discolorSelectedDateRange();
      colorSelectedDateRange();
    };
    /**
         * Invoke by ng-change when user invoke changes to end date string
         */
    $scope.changeEndDate = function () {
      if (!turnCalendarService.validateDateInput($scope.endDateString)) {
        return;
      }
      var newDate = new Date($scope.endDateString);
      setEndDateString(generateMetaDateObject(newDate, newDate.getMonth()));
    };
    angular.forEach([
      'startDate',
      'endDate'
    ], function (attribute) {
      $scope.$watch(attribute, function (newVal) {
        if (!turnCalendarService.validateDateInput(newVal)) {
          return;
        }
        var newDate = new Date(newVal);
        if (attribute === 'startDate') {
          newDate = resetStartDate(newDate);
          selectedStartDate = generateMetaDateObject(newDate, newDate.getMonth());
          $scope.startDateString = selectedStartDate.date.toLocaleDateString();
          $scope.currentSelectedStartDate = selectedStartDate;
        } else {
          newDate = resetEndDate(newDate);
          selectedEndDate = generateMetaDateObject(newDate, newDate.getMonth());
          $scope.endDateString = selectedEndDate.date.toLocaleDateString();
          $scope.currentSelectedEndDate = selectedEndDate;
        }
        if (selectedStartDate && selectedEndDate) {
          discolorSelectedDateRange();
          colorSelectedDateRange();
          lastSelectedDate = selectedEndDate;
        }
      });
    });
    // Set the end date and start date if they are set by users
    if (turnCalendarService.validateDateInput(self.startDate) && turnCalendarService.validateDateInput(self.endDate)) {
      var startDate = resetStartDate(new Date(self.startDate)), endDate = resetEndDate(new Date(self.endDate));
      selectedStartDate = generateMetaDateObject(startDate, startDate.getMonth());
      selectedEndDate = generateMetaDateObject(endDate, endDate.getMonth());
      $scope.currentSelectedStartDate = selectedStartDate;
      $scope.currentSelectedEndDate = selectedEndDate;
      $scope.startDateString = startDate.toLocaleDateString();
      $scope.endDateString = endDate.toLocaleDateString();
      lastSelectedDate = selectedEndDate;
      discolorSelectedDateRange();
      colorSelectedDateRange();
    }
    /*
         * This will make sure that click outside of calendar will close the calendar
         * (behave same as cancel button click)
         */
    $document.bind('click', function (event) {
      if (!angular.element('turn-calendar').find(event.target).length) {
        $scope.$apply(function () {
          $scope.cancel();
        });
      }
    });
  }
]).directive('turnCalendar', function () {
  return {
    restrict: 'E',
    scope: {
      startingMonth: '=',
      startingYear: '=',
      backwardMonths: '=',
      forwardMonths: '=',
      startDayOfWeek: '=',
      weeklySelectRange: '=',
      monthlySelectRange: '=',
      minSelectDate: '=',
      maxSelectDate: '=',
      priorRangePresets: '&',
      maxForwardMonth: '=',
      minBackwardMonth: '=',
      startDate: '=',
      endDate: '=',
      applyCallback: '&',
      selectionMode: '='
    },
    controller: 'CalendarController',
    templateUrl: 'turnCalendar.html'
  };
});
angular.module('calendarTemplates', ['turnCalendar.html']);

angular.module("turnCalendar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("turnCalendar.html",
    "<button ng-click=\"enableCalendar()\" class=\"turn-calendar-enable-btn\">{{currentSelectedStartDate.date.toLocaleDateString()}} <span\n" +
    "        ng-show=\"currentSelectedStartDate.date\">-</span> {{currentSelectedEndDate.date.toLocaleDateString()}}\n" +
    "</button>\n" +
    "<div>\n" +
    "    <div class=\"turn-calendar-div\" ng-show=\"calendarEnabled\">\n" +
    "        <div class=\"turn-calendar-input-container\">            \n" +
    "            <div class=\"turn-calendar-input\">\n" +
    "                <span class=\"turn-calendar-from\">From</span>\n" +
    "                <input class=\"turn-calendar-input-box\" type=\"text\" ng-model=\"startDateString\" ng-change=\"changeStartDate()\" />\n" +
    "                <span class=\"turn-calendar-to\">To</span>\n" +
    "                <input class=\"turn-calendar-input-box\" type=\"text\" ng-model=\"endDateString\" ng-change=\"changeEndDate()\" />\n" +
    "                <span ng-show=\"priorButtons.length\" class=\"turn-calendar-prior-label\">Prior</span>\n" +
    "                <button class=\"turn-calendar-prior\" ng-repeat=\"range in priorButtons\" ng-click=\"selectRange(range, $index)\" \n" +
    "                        ng-class=\"{'turn-calendar-prior-left': $index == 0, \n" +
    "                                   'turn-calendar-prior-right': $index == priorButtons.length-1, \n" +
    "                                   'active': $index == selectedPriorButtonIndex\n" +
    "                                  }\" turn-calendar-prior\">{{range.value}}</button>              \n" +
    "                <span ng-show=\"priorButtons.length\" class=\"turn-calendar-day-label\">Days</span>\n" +
    "            </div>\n" +
    "            <div class=\"turn-calendar-submit\">              \n" +
    "                <button ng-click=\"applyCalendar()\" class=\"turn-calendar-done-btn\" ng-class=\"{'turn-calendar-btn-disabled': !isBothDateSelected}\">Done</button>\n" +
    "            </div>\n" +
    "            <p class=\"clear\"></p>\n" +
    "        </div>\n" +
    "        <div class=\"turn-calendar-table-container\">\n" +
    "            <div class=\"turn-calendar-navigation-left\" ng-click=\"previousMonth()\">\n" +
    "                <div class=\"turn-calendar-arrow-left\"></div>\n" +
    "            </div>\n" +
    "            <table class=\"turn-calendar-table\" ng-repeat=\"month in monthArray\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"{{DAYS_IN_WEEK}}\" class=\"turn-calendar-month\">{{monthNames[$index]}}</th>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th ng-repeat=\"dayName in dayNames\" class=\"turn-calendar-day\">{{dayName}}</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"days in month\">\n" +
    "                        <td ng-repeat=\"day in days\"\n" +
    "                            ng-class=\"{'turn-calendar-mouse-over': day.isHover,\n" +
    "                                       'turn-calendar-selected-daily': day.selectMode == 'daily',\n" +
    "                                       'turn-calendar-selected-weekly': day.selectMode == 'weekly',\n" +
    "                                       'turn-calendar-selected-monthly': day.selectMode == 'monthly',\n" +
    "                                       'turn-calendar-unavailable': day.isUnavailable,\n" +
    "                                       'turn-calendar-date': day.date.getDate()}\"\n" +
    "                            ng-mouseenter=\"mouseEnter(day)\"\n" +
    "                            ng-mouseleave=\"mouseLeave(day)\"\n" +
    "                            ng-click=\"setDayClick(day)\">{{day.date.getDate()}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "            <div class=\"turn-calendar-navigation-right\" ng-click=\"nextMonth()\">\n" +
    "                <div class=\"turn-calendar-arrow-right\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
