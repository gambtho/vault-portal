'use strict';

angular.module('vaultPortal.store', ['ngRoute'] )

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/store', {
            templateUrl: 'store/store.html',
            controller: 'storeController',
            factory: store
        });
    }])

    .controller('storeController', function ($scope, store) {
        $scope.path   = 'some-secret-namespace/db';
        $scope.key = 'dbuname2';
        $scope.value = 'dbpassword2';

        $scope.store = function() {
            store.save($scope.path, $scope.key, $scope.value, $scope.url, $scope.token)
                .then(function (response) {
                    $scope.path = '';
                    $scope.key = '';
                    $scope.value = '';
                    alert(response);
                }, function (reason) {
                    alert(reason);
                });
        };
    })

    .factory('store', function ($http) {
        return {
            save: function (path, key, value, url, token) {
                console.log(path, key, value, url, token);
                return $http({
                    url: url + '/v1/secret/' + path,
                    method: "POST",
                    header: { 'X-Vault-Token': token},
                    data: {db_username: key, db_password: value},
                })
                    .then(function (results) {
                        console.log(results.data.auth.client_token);
                        return(results.data.auth.client_token);
                    })
            }

        }
    });
