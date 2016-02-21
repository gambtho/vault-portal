"use strict";
angular.module('myApp.authentication.ctrl', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/authentication', {
    templateUrl: 'authentication/authentication.html',
    controller: 'LoginController'
  });
}])

.controller('LoginController', function () {

    return {

        login: function(){
            return true;
        }

    }
});

//.controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
//    $scope.credentials = {
//        username: '',
//        password: ''
//    };
//
//    $scope.login = function (credentials) {
//        AuthService.login(credentials).then(function (user) {
//            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//            $scope.setCurrentUser(user);
//        }, function () {
//            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
//        });
//    };
//});
