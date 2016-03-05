///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Component} from "angular2/core";
import {Store} from './store/store';
import {StoreData} from './store/store.factory';
import {Auth} from './auth/auth';
import {AuthFactory} from './auth/auth.factory';


@Component({
    selector: 'vault-portal',
    directives: [Store, Auth, ROUTER_DIRECTIVES],
    template: `
        <router-outlet></router-outlet>
    `
})
@RouteConfig([
    {path: '/store',   name: 'Store', component: Store },
    {path: '/auth',   name: 'Auth', component: Auth, useAsDefault: true }
])

class VaultPortal {}

bootstrap(VaultPortal, [StoreData, AuthFactory, HTTP_PROVIDERS, ROUTER_PROVIDERS]);
