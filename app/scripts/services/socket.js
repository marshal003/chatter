'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('chatterApp')
.factory('socket', function ($rootScope, $window) {
  var URL = $window.location.protocol + '//' + $window.location.host;
  var socket = io.connect(URL);
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
	  }
  };
});