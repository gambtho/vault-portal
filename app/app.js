'use strict';

// Declare app level module which depends on views, and components
angular.module('vaultPortal', [
    'ngRoute',
    'ui.bootstrap',
    'vaultPortal.store',
    'vaultPortal.status',
    'vaultPortal.auth',
    'vaultPortal.version',
]).
config(['$routeProvider', '$injector', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/auth'});
}]);
