angular.module('calendarTemplates', ['turnCalendar.html']);

angular.module("turnCalendar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("turnCalendar.html",
    "<button ng-click=\"enableCalendar()\" class=\"turn-calendar-enable-btn\" ng-disabled=\"disabled()\">{{getDateString(currentSelectedStartDate.date, timeZone)}} <span\n" +
    "        ng-show=\"currentSelectedStartDate.date && isNotSingleDateMode\">- {{getDateString(currentSelectedEndDate.date, timeZone)}} </span>\n" +
    "</button>\n" +
    "<div>\n" +
    "    <div class=\"turn-calendar-div\" ng-show=\"calendarEnabled\">\n" +
    "        <div class=\"turn-calendar-input-container\">\n" +
    "            <div class=\"turn-calendar-input\">\n" +
    "                <span ng-show=\"isNotSingleDateMode && !isDayClickDisabledMode\" class=\"turn-calendar-from\">From</span>\n" +
    "                <input ng-show=\"!isDayClickDisabledMode\" class=\"turn-calendar-input-box\" type=\"text\" ng-model=\"startDateString\" ng-change=\"changeStartDate()\" />\n" +
    "                <span ng-show=\"isNotSingleDateMode && !isDayClickDisabledMode\" class=\"turn-calendar-to\">To</span>\n" +
    "                <input ng-show=\"isNotSingleDateMode && !isDayClickDisabledMode\" class=\"turn-calendar-input-box\" type=\"text\" ng-model=\"endDateString\" ng-change=\"changeEndDate()\" />\n" +
    "                <span ng-show=\"priorButtons.length && isNotSingleDateMode\" \n" +
    "                        class=\"turn-calendar-prior-label\"\n" +
    "                        ng-class=\"{'no-left-margin': isDayClickDisabledMode}\">\n" +
    "                        Prior</span>\n" +
    "                <button ng-show=\"isNotSingleDateMode\" class=\"turn-calendar-prior\" ng-repeat=\"range in priorButtons\" \n" +
    "                        ng-click=\"selectRange(range, $index)\"\n" +
    "                        ng-class=\"{'turn-calendar-prior-left': $index == 0,\n" +
    "                                   'turn-calendar-prior-right': $index == priorButtons.length-1,\n" +
    "                                   'active': $index == selectedPriorButtonIndex\n" +
    "                                  }\" turn-calendar-prior>{{range.value}}</button>\n" +
    "                <span ng-show=\"priorButtons.length && isNotSingleDateMode\" class=\"turn-calendar-day-label\">Days</span>\n" +
    "            </div>\n" +
    "            <div class=\"turn-calendar-submit\">\n" +
    "                <button ng-click=\"applyCalendar()\" class=\"turn-calendar-done-btn\" >Done</button>\n" +
    "            </div>\n" +
    "            <p class=\"clear\"></p>\n" +
    "        </div>\n" +
    "        <div class=\"turn-calendar-table-container\">\n" +
    "            <div class=\"turn-calendar-table-central-aligner\">\n" +
    "                <div class=\"turn-calendar-navigation-left\" ng-click=\"previousMonth()\" ng-hide=\"isDayClickDisabledMode\">\n" +
    "                    <div class=\"turn-calendar-arrow-left\"></div>\n" +
    "                </div>\n" +
    "                <table class=\"turn-calendar-table\" ng-repeat=\"month in monthArray\">\n" +
    "                    <thead>\n" +
    "                        <tr>\n" +
    "                            <th colspan=\"{{DAYS_IN_WEEK}}\" class=\"turn-calendar-month\">{{monthNames[$index]}}</th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th ng-repeat=\"dayName in dayNames\" class=\"turn-calendar-day\">{{dayName}}</th>\n" +
    "                        </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "                        <tr ng-repeat=\"days in month\">\n" +
    "                            <td ng-repeat=\"day in days\"\n" +
    "                                ng-class=\"{'turn-calendar-mouse-over': day.isHover,\n" +
    "                                           'turn-calendar-selected-daily': day.selectMode == 'daily',\n" +
    "                                           'turn-calendar-selected-weekly': day.selectMode == 'weekly',\n" +
    "                                           'turn-calendar-selected-monthly': day.selectMode == 'monthly',\n" +
    "                                           'turn-calendar-unavailable': day.isUnavailable || isDayClickDisabledMode,\n" +
    "                                           'turn-calendar-unclickable': isDayClickDisabledMode,\n" +
    "                                           'turn-calendar-date': day.date.getDate()}\"\n" +
    "                                ng-mouseenter=\"mouseEnter(day)\"\n" +
    "                                ng-mouseleave=\"mouseLeave(day)\"\n" +
    "                                ng-click=\"setDayClick(day)\">{{day.date.getDate()}}\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "                <div class=\"turn-calendar-navigation-right\" ng-click=\"nextMonth()\" ng-hide=\"isDayClickDisabledMode\">\n" +
    "                    <div class=\"turn-calendar-arrow-right\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
