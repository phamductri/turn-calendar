turn calendar
========

### Introduction
Turn Angular is a calendar-like component for AngularJS. It behaviors are very similar to Google analytics calendar,
with a few extra unique options.

[Demo](http://phamductri.github.io/turn-calendar/demo/)

### Why Turn Calendar ?

Use Turn Calendar if you want a native AngularJS directive that:

- Behaves like Google Analytics calendar
- A calendar that is able to do date range selection
- Configurable prior range preset buttons
- API supports for start date and end date selection
- Multiple selection mode

### Feature comparison

Comparison between Turn Calendar and Angular Strap datepicker, Angular Bootstrap Date picker

| Feature                     | Turn Calendar | Angular Strap Datepicker | Angular Bootstrap Datepicker |
|-----------------------------|---------------|--------------------------|------------------------------|
| Single date selection       | Yes           | Yes                      | Yes                          |
| Date range selection        | Yes           | No                       | No                           |
| Multiple month instances    | Yes           | No                       | No                           |
| Min/Max date selection      | Yes           | Yes                      | Yes                          |
| Restrict month movement     | Yes           | No                       | No                           |
| CSS                         | Custom        | Bootstrap                | Boostrap                     |
| Arbitrary start day of week | Yes           | Yes                      | Yes                          |
| Date format customization   | No            | Yes                      | Yes                          |
| Weekly/Monthly Mode         | Yes           | No                       | No                           |
| Customizable starting month | Yes           | No                       | No                           |
| Prior range preset          | Yes           | No                       | No                           |
| Settable start/end date     | Yes           | Yes                      | Yes                          |
| Multiple selection mode     | Yes           | No                       | No                           |

### Dependencies

- angular (1.0.8)
- jQuery (2.1.1)

### Usage

**html**

```html
...
<link rel="stylesheet" href="turnCalendar.css">

</head>
<body>

<div ng-controller="fooCtrl">
    <turn-calendar calendar-options="calendarOptions"></turn-calendar>
</div>
...
<script src="turnCalendar.js"></script>
```

**js**

```js
angular
.module('foo', ['turn/calendar'])
.controller('fooCtrl', function ($scope) {

    $scope.calendarOptions = {
                        startDayOfWeek: 1,
                        backwardMonths: 2,
                        minSelectDate: '9/13/2013',
                        weeklySelectRange: 60,
                        monthlySelectRange: 90,
                        minBackwardMonth: '08/2013',
                        priorRangePresets: [{value: 7}, {value: 30, isDefault: true}, {value : 45}],
                        maxForwardMonth: $scope.maxMonthAllowed()
                    };

});
```

### Run the demo

```shell
bower install
npm install
grunt build
grunt serve
```

then pop open index.html in a browser. Address is http://localhost:9000/index.html

### Run the tests

```
bower install
npm install
grunt test
```

### Documentation

An AngularJS directive that allows a calendar to be display when embedded.

Allow the following options :

| Option             | Type          | Required/Optional | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|--------------------|---------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| startingMonth      | number        | Optional          | The STARTING month of the calendar, if not specify will use the current month. January is count as 0, February is 1, and so on.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| startingYear       | number        | Optional          | The STARTING year of the calendar, if not specify will use the current year.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| backwardMonths     | number        | Optional          | The number of calendar instances of previous months count from the STARTING month instance, notice the s. For example, if the STARTING month is September, and you want to display July and August in your calendar pop up, set backwardMonths=2. Maximum allowed value is 6. Minimum allowed is 1. If you don't set anything or setting values not in allowed range, there won't be any backward months to display (i.e default value is 0).                                                                                                                                                                                                                                                                                                                                                                  |
| forwardMonths      | number        | Optional          | The number of calendar instances of next months count from the STARTING instance, notice the s at the end. For example: STARTING month is September, and you want to display October and November, set forwardMonths=2. Maximum allowed value is 6. Minimum allowed is 1. If you don't set anything or setting values not in allowed range, there won't be any forward months to display (i.e default value is 0).                                                                                                                                                                                                                                                                                                                                                                                             |
| startDayOfWeek     | number        | Optional          | Allow the ability to set any day of the week as the first day of week. Use 0 for Sunday, 1 for Monday, so on. Default is 0.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| minSelectDate      | string/number | Optional          | The minimum date which any dates which are earlier than that date will not be able to be selected, accept a string in MM-DD-YYYY or MM/DD/YYYY format, or a Unix timestamp.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| maxSelectDate      | string/number | Optional          | The maximum date which any dates which are later than that date will not be able to be selected, accept a string in MM-DD-YYYY or MM/DD/YYYY format, or a Unix timestamp.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| weeklySelectRange  | number        | Optional          | A number in which if the hovered (or selected) CURRENT date is beyond the LAST selected date, the mouse pointer will change to WEEKLY hover/selected mode. If this or monthlySelectChange is not specified, the default mode is daily.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| monthlySelectRange | number        | Optional          | A number in which if the hovered (or selected) CURRENT date is beyond the LAST selected date, the mouse pointer will change to MONTHLY hover/selected mode. If this or weeklySelectRange is not specified, the default mode is daily.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| priorRangePresets  | array<object> | Optional          | An array of object that specify the range buttons to appear for user to select prior range from the CURRENT date. If you want a pre-selected range add a property called isDefault: true. The object MUST have a property called 'value' to display it. 'value' is a number. 'value' is a range that will allow the user to select date range from CURRENT date once clicked. The range will conform with minSelectDate, maxSelectDate, weeklySelectDate, monthlySelectDate parameters if these parameters are set. If you currently in a different month view, clicking on any of the prior button will reset your current view back to the CURRENT month. If your selection mode is 'singleDate', this option will NOT come into effect. Example : [{value: 20, isDefault: true}, {value: 45}, {value : 90}] |
| maxForwardMonth    | string        | Optional          | Setting the max month which the NEXT button allowed to work. Format is MM/YYYY. January starts as 0. This setting will override the setting in forwardMonths. For example, you set the starting month as August 2013, with forwardMonths is 3, maxForwardMonth is 10/2013, your calendar will miss the month November 2013, because it exceeds the maxForwardMonth.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| minBackwardMonth   | string        | Optional          | Setting the min month which the PREVIOUS button allowed to work. Format is MM/YYYY . January start as 0. This setting will override the setting in backwardMonths. For example, you set the base month to be March 2014, with backwardMonths to be 3. You also set minBackwardMonths to be 1/2014. The calendar will not display January 2014, and Dec 2013, since minBackwardMonths override backwardMonths. Attempt to press PREVIOUS button won't work either.                                                                                                                                                                                                                                                                                                                                              |
| startDate          | string/number | Optional          | Set the start date to be selected on the calendar. Accept dateString or Unix timestamp. Set this as a directive attribute if you want to be able to set this value in real time. This is the directive to use if you want to read the current selected start date. If minSelectDate is set, and startDate falls into a date that is earlier than minSelectDate, the startDate will be pumped up until it reaches a day that is not conflicted with minSelectDate.                                                                                                                                                                                                                                                                                                                                              |
| endDate            | string/number | Optional          | Set the end date to be selected on the calendar. Accept dateString or Unix timestamp. Set this value as directive attribute if you want to be able to set this value in real time. This is the directive to use if you want to read the current selected end date. If maxSelectDate is set, and this endDate falls into a date that is later than maxSelectDate, endDate will be going backward till it reaches a date that is not conflicted with maxSelectDate.                                                                                                                                                                                                                                                                                                                                              |
| applyCallback      | function      | Optional          | A callback function to call when the "Apply" button is pressed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| selectionMode      | string        | Optional          | The selection behavior of the calendar. Support three options : 'twoClick', 'lastSelectedDate', 'singleDate', and 'disableDayClick'. Default selection mode is 'twoClick', where the selected start date and end date is cleared out every time the user try a new selection. For the mode 'lastSelectedDate', the cursor will jump based on the previous selected date. For the mode 'singleDate', you can only select one date at a time. For the mode 'disableDayClick', you cannot click on the calendar to select dates.                                                                                                                                                                                                                                                                                                                                                                                      |

Example:

```html
<turn-calendar start-day-of-week="1" starting-month="11" starting-year="2013"
                 forward-months="3" backward-months="3" min-select-date="'09/13/2013'"
                 weekly-select-range="30" monthly-select-range="60"
                 prior-range-presets="[{value: 20, isDefault: true}, {value: 45}, {value : 90}]"
                 max-forward-month="'10/2014'">
<turn-calendar>
```

All of the above options can be set through an option object. Pass in the option
object through attribute calendarOptions. If you set the same setting in attribute
and in option object, the value set in attribute will used over the value in
option object.

Real time update for following options are supported : startDate, endDate,
minSelectDate, maxSelectDate, minBackwardMonth, maxForwardMonth, forwardMonths,
backwardMonths. These options have to set through attributes for real time
tracking to work. Setting through options object will not work.

The above code snippet will display 7 months instance, starting from Sep 2013
to March 2014, with Monday as the starting day of the week, the base month is
Dec 2013, it will change to weekly select mode if the cursor is 30 days beyond
the last selected date, monthly select mode if cursor is 60 days beyond the last
selected date. It will display 3 prior buttons: 20, 45, 90, with 25 is pre-selected
from the CURRENT date. Anything before 09/13/2013 is not available for selection.
Any month above Nov of the year 2014 is not allowed.

### Todo list

- Support i18n for month name, day abbreviations, or day names
- Support date formatting

### Contribute

Contributes from everyone are welcomed. A few ways you can contribute immediately:

- Write more specs
- Feature suggestions
- Code feedback

### Author

Tri Pham <tri.pham@turn.com>

### License

Apache2
