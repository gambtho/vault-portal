'use strict';

describe('Store ', function () {

    var valid_response = '{ good }';

    beforeEach(module('vaultPortal.store'));


    describe('controller', function () {

        var $scope, ctrl, $q, defer, spy;

        beforeEach(function () {

            inject(function ($rootScope, $controller, _$q_, store) {
                $q = _$q_;
                $scope = $rootScope;

                defer = _$q_.defer();

                spy = spyOn(store, 'save').and.returnValue(defer.promise);

                ctrl = $controller('storeController', {
                    $scope: $scope,
                    store: store
                });
            });

        });

       xit('should have login controller defined', function () {
            expect(ctrl).toBeDefined();
        });

        xit('should start with user and password not populated', function () {
            expect($scope.path).toEqual('');
            expect($scope.key).toEqual('');
            expect($scope.value).toEqual('');
        });

        xit('should store a secret when data is provided', function () {
            defer.resolve("blah");
            $scope.url = 'url';
            $scope.token = 'token';
            $scope.path = 'path';
            $scope.key = 'key';
            $scope.value = 'value';


            $scope.store();
            $scope.$apply();

            expect(spy).toHaveBeenCalledWith('path', 'key', 'value', 'url', 'token');

            //expect alert?
        });
    });

    describe('service', function () {
        var httpBackend, store;

        beforeEach(function () {

            inject(function ($httpBackend, _store_) {
                store = _store_;
                httpBackend = $httpBackend;

            });
        });

        afterEach(function () {
            //httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        xit('should have store service defined', function () {
            expect(store).toBeDefined();
        });

        xit('should return token when valid user and password are provided', function () {
            var result = {};
            var returnData = valid_response;
            httpBackend.expectPOST('').respond(returnData);

            var returnedPromise = store.save('path', 'key', 'value', 'url', 'token');

            returnedPromise.then(function (response) {
                result = response;
            });

            httpBackend.flush();

            expect(result).toEqual('');
        });

    });
});
