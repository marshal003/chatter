'use strict';

angular.module('chatterApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
