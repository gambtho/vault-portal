'use strict';

angular.module('vaultPortal.store', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/store', {
            templateUrl: 'store/store.html',
            controller: 'StoreCtrl'
        });
    }])

    .controller('StoreCtrl', [function() {

    }]);
