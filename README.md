calendar [![Build Status](https://travis-ci.org/turn/calendar.svg?branch=master)](https://travis-ci.org/turn/calendar) [![Coverage Status](https://img.shields.io/coveralls/turn/calendar.svg)](https://coveralls.io/r/turn/calendar)
========

### dependencies

- angular (1.0.8)

### usage

**html**

```html
...
<link rel="stylesheet" href="calendar.css">

</head>
<body>

<div ng-controller="fooCtrl">
	<!-- ... -->
</div>
...
<script src="calendar.js"></script>
```

**js**

```js
angular
.module('foo', ['turn/calendar'])
.controller('fooCtrl', function ($scope) {
	
	// ...

});
```

### run the demo

```shell
bower install
npm install
grunt
```

then pop open index.html in a browser.

### run the tests

```
bower install
npm install
grunt test
```

### hack on it

```
bower install
npm install
grunt watch
```

### license

Apache2