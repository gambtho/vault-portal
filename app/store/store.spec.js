'use strict';

describe('Store', function () {

    beforeEach(module('vaultPortal.store'));

    describe('controller', function () {

        var $scope, ctrl, auth, $q, defer, saveSpy, alertSpy;

        beforeEach(function () {

            inject(function ($rootScope, $controller, _$q_, store) {
                $q = _$q_;
                $scope = $rootScope;

                auth = {
                    getToken: function(){
                        return 'token';
                    }
                };

                defer = _$q_.defer();

                saveSpy = spyOn(store, 'save').and.returnValue(defer.promise);
                alertSpy = spyOn(window, 'alert');

                ctrl = $controller('storeController', {
                    $scope: $scope,
                    store: store,
                    auth: auth
                });
            });

        });

        xit('should have store controller defined', function () {
            expect(ctrl).toBeDefined();
        });

        xit('should start with user and password not populated', function () {
            //expect($scope.path).toEqual('');
            expect($scope.key).toEqual('');
            expect($scope.value).toEqual('');
        });

        xit('should store a secret when data is provided and confirm the save to the user', function () {
            defer.resolve(200);
            $scope.url = 'url';
            $scope.token = 'token';
            $scope.path = 'path';
            $scope.key = 'key';
            $scope.value = 'value';


            $scope.store();
            $scope.$apply();

            expect(saveSpy).toHaveBeenCalledWith('path', 'key', 'value', 'url', 'token');

            expect(alertSpy).toHaveBeenCalledWith('Secret saved - 200');
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
            var result = '';
            var returnData = '{ }';
            var url = 'url';

            httpBackend.expectPOST(url + '/v1/secret/path').respond(returnData);

            var returnedPromise = store.save('path', 'key', 'value', url, 'token');

            returnedPromise.then(function (response) {
                result = response;
            });

            httpBackend.flush();

            expect(result).toEqual(200);
        });

    });
});
