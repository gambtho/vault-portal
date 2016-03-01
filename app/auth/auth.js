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
            $scope.username   = 'pcf-space-id';
            $scope.password  = 'pcf-service-instance-id';
            $scope.url = 'http://tg23qo-prod.apigee.net/vault';
            $scope.token = '';

            $scope.login = function() {
                auth.login($scope.url, $scope.username, $scope.password)
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
            login: function (url, username, password) {
                console.log(url, username, password);
                return $http({
                    url: url + '/v1/auth/app-id/login',
                    method: "POST",
                    data: {app_id: username, user_id: password},
                })
                    .then(function (results) {
                        console.log(results.data.auth.client_token);
                        return(results.data.auth.client_token);
                    })
            }

        }
    });
