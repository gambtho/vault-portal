'use strict';

angular.module('vaultPortal.version', [
  'vaultPortal.version.interpolate-filter',
  'vaultPortal.version.version-directive'
])

.value('version', '0.1');
