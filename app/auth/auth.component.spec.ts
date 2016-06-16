///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import { it, describe, expect, TestComponentBuilder, ComponentFixture,
    injectAsync, beforeEachProviders} from 'angular2/testing';


import {provide, Injector} from 'angular2/core';
import {Auth} from './auth.component';
import {AuthFactory} from './auth.factory';
import {Router} from "angular2/router";

class MockAuthFactory  {
    public login(user, pass) {
        return(user+pass);
    }
}

class MockRouter {
    
}

describe('Auth Component', () => {
    
    var injector;
    var component;
    
    beforeEach(() => {
        injector = Injector.resolveAndCreate([
            provide(Router, {useClass: MockRouter}),
            provide(AuthFactory, {useClass: MockAuthFactory}),
            provide(
                Auth,
                {
                    useFactory: function (auth:AuthFactory, router:Router) {
                        return new Auth(auth, router);
                    },
                    deps: [AuthFactory, Router]
                }
            )
        ]);
        component = injector.get(Auth);
    });

    beforeEachProviders(() => [
        provide(Router, {useClass: MockRouter}), 
        provide(AuthFactory, {useClass: MockAuthFactory})
    ]);

    it('should display login page', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(Auth).then((componentFixture: ComponentFixture) => {
            const element = componentFixture.nativeElement;
            componentFixture.detectChanges();
            expect(element.querySelectorAll('username').length).toBe(0);
            expect(element.querySelectorAll('password').length).toBe(0);
        });
    }));

    it('initialize user and password', () => {
        expect(component.username).toBe("app_id1");
        expect(component.password).toBe("pcf_id");
    });


    it('reset on failed login', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(Auth).then((componentFixture: ComponentFixture) => {
            const element = componentFixture.nativeElement;
            componentFixture.detectChanges();
            expect(element.querySelectorAll('username').length).toBe(0);
            expect(element.querySelectorAll('password').length).toBe(0);
        });
    }));

});




