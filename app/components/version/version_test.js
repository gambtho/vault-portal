'use strict';

describe('vaultPortal.version module', function() {
  beforeEach(module('vaultPortal.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
