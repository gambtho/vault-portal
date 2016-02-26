'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.auth',
  'myApp.version',
]).
config(['$routeProvider', '$injector', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/auth'});
}]);
