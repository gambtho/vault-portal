'use strict';

angular.module('vaultPortal.auth', ['ngRoute'] )

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/auth', {
            templateUrl: 'auth/auth.html',
            controller: 'loginController',
            factory: 'auth'
        });
    }])

    .controller('loginController', function ($scope, $location, auth) {
            $scope.username   = '';
            $scope.password  = '';
            $scope.token = '';

            $scope.login = function() {
                auth.login($scope.username, $scope.password)
                    .then(function (response) {
                        $scope.token = response;
                        $location.path('/store');
                    }, function (reason) {
                        $scope.error = reason;
                        $scope.password = '';
                        $location.path('/auth');
                    });
            };
        })

    .factory('auth', function ($http) {
        return {

            login: function (username, password) {
                return $http.get("vaultAddress?" + username + "&" + password)
                    .then(function (result) {
                        return result.data;
                    });
            }
        }
    });