'use strict';

angular.module('vaultPortal.status', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/status', {
    templateUrl: 'status/status.html',
    controller: 'StatusCtrl'
  });
}])

.controller('StatusCtrl', [function() {

}]);