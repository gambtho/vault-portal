///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {StoreData} from './store.factory'
import {Store} from './store';
import {AuthFactory} from '../auth/auth.factory';
import {Router, RouteParams} from 'angular2/router';

describe('Store', () => {
    let store:Store;
    //let storeData:StoreData = new StoreData();
    //let auth:AuthFactory = new AuthFactory();


    beforeEach(() => {

       // store = new Store(storeData, auth, router);
    });

    xit('should start with user and password not populated', () => {
        //expect($scope.path).toEqual('');
        //expect($scope.key).toEqual('');
        //expect($scope.value).toEqual('');
    });

    xit('should store a secret when data is provided and confirm the save to the user',  () => {
        //defer.resolve(200);
        //$scope.url = 'url';
        //$scope.token = 'token';
        //$scope.path = 'path';
        //$scope.key = 'key';
        //$scope.value = 'value';
        //
        //
        //$scope.store();
        //$scope.$apply();
        //
        //expect(saveSpy).toHaveBeenCalledWith('path', 'key', 'value', 'url', 'token');
        //
        //expect(alertSpy).toHaveBeenCalledWith('Secret saved - 200');
    });

    it('Should get 5 dogs', () => {
        //list.ngOnInit();
        //
        //expect(list.items.length).toBe(5);
        //expect(list.items).toEqual(['golden retriever', 'french bulldog', 'german shepherd', 'alaskan husky', 'jack russel terrier']);
    });
});


describe('Store', function () {
    let store:Store;

    describe('service', function () {
        var httpBackend, store;

        beforeEach( () => {

            //inject(function ($httpBackend, _store_) {
            //    store = _store_;
            //    httpBackend = $httpBackend;
            //
            //});
        });

        afterEach(() => {
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
