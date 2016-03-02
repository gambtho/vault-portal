'use strict';

angular.module('vaultPortal.auth', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/auth', {
            templateUrl: 'auth/auth.html',
            controller: 'loginController',
            factory: 'auth'
        });
    }])

    .controller('loginController', function ($scope, $location, auth) {
        $scope.username = '';
        $scope.password = '';
        //$scope.username   = 'pcf-space-id';
        //q:$scope.password  = 'pcf-service-instance-id';

        $scope.url = 'http://tg23qo-prod.apigee.net/v1';
        $scope.token = '';

        $scope.login = function () {
            auth.login($scope.url, $scope.username, $scope.password)
                .then(function (response) {
                    auth.setToken(response);
                    $location.path('/store');
                }, function (reason) {
                    $scope.error = reason;
                    $scope.password = '';
                    alert('Login failure');
                    $location.path('/auth');
                });
        };
    })

    .factory('auth', function ($http) {

        var token;

        return {
            login: function (url, username, password) {
                return $http({
                    url: url + '/v1/auth/app-id/login',
                    method: "POST",
                    data: {app_id: username, user_id: password}
                })
                    .then(function (results) {
                        console.log(results.data.auth.client_token);
                        return (results.data.auth.client_token);
                    })
            },
            setToken: function(string) {
                token = string;
            },
            getToken: function() {
                return token;
            }

        }
    });
