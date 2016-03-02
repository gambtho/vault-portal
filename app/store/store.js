'use strict';

angular.module('vaultPortal.store', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/store', {
            templateUrl: 'store/store.html',
            controller: 'storeController',
            factory: 'store'
        });
    }])

    .controller('storeController', function ($scope, $location, store, auth) {
        $scope.path = 'some-secret-namespace/db';
        $scope.key = '';
        $scope.value = '';

        if (!auth.getToken()) {
            $location.path('/auth');
        }

        $scope.store = function () {
            store.save($scope.path, $scope.key, $scope.value, $scope.url, $scope.token)
                .then(function (response) {
                    $scope.path = '';
                    $scope.key = '';
                    $scope.value = '';
                    alert('Secret saved - ' + response);
                }, function (reason) {
                    alert('Secret not saved - ' + reason);
                });
        };
    })

    .factory('store', function ($http) {
        return {
            save: function (path, key, value, url, token) {
                return $http({
                    url: url + '/v1/secret/' + path,
                    method: "POST",
                    header: {'X-Vault-Token': token},
                    data: {db_username: key, db_password: value},
                })
                    .then(function (results) {
                        return (results.status);
                    })
            }

        }
    });
