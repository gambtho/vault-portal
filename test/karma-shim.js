///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

Error.stackTraceLimit = Infinity;


require('angular2/platform/browser');
require('es6-shim');
require('reflect-metadata');



require('angular2/platform/browser');
require('angular2/core');
require('angular2/http');
require('angular2/router');

require('rxjs/add/operator/map');
require('rxjs/operator/delay');
require('rxjs/operator/mergeMap');
require('rxjs/operator/switchMap');

require('zone.js/dist/zone-microtask.js');
require('zone.js/dist/long-stack-trace-zone.js');
require('zone.js/dist/jasmine-patch.js');


var testing = require('angular2/testing');
var browser = require('angular2/platform/testing/browser');

testing.setBaseTestProviders(
    browser.TEST_BROWSER_PLATFORM_PROVIDERS,
    browser.TEST_BROWSER_APPLICATION_PROVIDERS);

Object.assign(global, testing);

var testContext = require.context('../app', true, /\.spec\.ts/);

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

var modules = requireAll(testContext);
