angular
    .module('turn/calendar', ['calendarTemplates'])
    .value('calendarOptions', {


    })
    .directive('calendar', function () {

        return {
            restrict: '',
            scope: {

            },
            templateUrl: 'calendar.html',
            link: function (scope, element) {

                angular.extend(scope, {


                });

                // Tear down
                scope.$on('$destroy', function () {
                });

            }
        };

    });