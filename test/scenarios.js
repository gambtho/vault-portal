'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /store when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/store");
  });


  describe('store', function() {

    beforeEach(function() {
      browser.get('index.html#/store');
    });


    it('should render store when user navigates to /store', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('status', function() {

    beforeEach(function() {
      browser.get('index.html#/status');
    });


    it('should render status when user navigates to /status', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
