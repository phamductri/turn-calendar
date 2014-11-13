turn calendar
========

### introduction
Turn Angular is a calendar-like component for AngularJS. It behaviors are very similar to Google analytics calendar,
with a few extra unique options.

### feature comparison

Comparison between Turn Calendar and Angular Strap datepicker, Angular Bootstrap Date picker

| Feature                     | Turn Calendar | Angular Strap Datepicker | Angular Bootstrap Datecicker |
|-----------------------------|---------------|--------------------------|------------------------------|
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

### dependencies

- angular (1.0.8)

### usage

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

### run the demo

```shell
bower install
npm install
grunt build
grunt serve
```

then pop open index.html in a browser. Address is http://localhost:9000/index.html

### run the tests

```
bower install
npm install
grunt test
```

### documentation

 An AngularJS directive that allows a calendar to be display when embedded.

 Allow the following options :



### license

Apache2