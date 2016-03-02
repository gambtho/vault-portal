'use strict';

angular.module('vaultPortal', [
    'ngRoute',
    'ui.bootstrap',
    'vaultPortal.store',
    'vaultPortal.auth'
]).
config(['$routeProvider', '$injector', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/auth'});
}]);
