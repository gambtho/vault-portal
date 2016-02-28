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
                        auth.setToken(response);
                        $location.path('/store');
                    }, function (reason) {
                        $scope.error = reason;
                    });
            };
        })

    .factory('auth', function ($http, $q, $timeout) {

        return {
            login: function (username, password) {
                var deferred = $q.defer();
                $timeout(function () {
                    if (username !== null && password === password) {
                        deferred.resolve({success: true});
                    } else {
                        deferred.reject({success: false, message: 'Username or password is incorrect'});
                    }
                }, 100);
                return deferred.promise;
            },
            setToken: function(token) {
              //
            }
        }
    });