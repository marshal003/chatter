'use strict';

/* Controllers */

function	chatCtrl($scope, socket, dataService) {

  // Socket listeners
  // ===============
$scope.getAllUsers = function(){
	 dataService.get('/api/users/').success(function(data){
		$scope.users = data;
	 });
};

$scope.getPreviousChats = function(){
	dataService.get('/api/chats/freebirds').success(function(data){
		$scope.messages = data;
	});
};
// Init data source
	$scope.getAllUsers();
	$scope.getPreviousChats();

	
socket.on('send:message', function (message) {
    $scope.messages.push(message);
  });

  socket.on('change:name', function (data) {
    changeName(data.oldName, data.newName);
  });

  socket.on('user:join', function (data) {
    $scope.getAllUsers();
  });

  // add a message to the conversation when a user disconnects or leaves the room
  socket.on('user:left', function (data) {
    $scope.messages.push({
      user:  data.name,
      text: 'User ' + data.name + ' has left.'
    });
    var i, user;
    for (i = 0; i < $scope.users.length; i++) {
      user = $scope.users[i];
      if (user === data.name) {
        $scope.users.splice(i, 1);
        break;
      }
    }
  });
  // Private helpers
  // ===============

  var changeName = function (oldName, newName) {
    // rename user in list of users
    var i;
    for (i = 0; i < $scope.users.length; i++) {
      if ($scope.users[i] === oldName) {
        $scope.users[i] = newName;
      }
    }

    $scope.messages.push({
      user: newName,
      text: 'User ' + oldName + ' is now known as ' + newName + '.'
    });
  };

  // Methods published to the scope
  // ==============================

  $scope.changeName = function () {
    socket.emit('change:name', {
      name: $scope.newName
    }, function (result) {
      if (!result) {
        console.log('There was an error changing your name');
      } else {
        
        changeName($scope.name, $scope.newName);

        $scope.name = $scope.newName;
        $scope.newName = '';
      }
    });
  };
  $scope.messages = [];

  $scope.sendMessage = function () {
    socket.emit('send:message', {
      message: $scope.message,
	  user: $scope.currentUser.name
    });

    // add the message to our model locally
    $scope.messages.push({
      user: $scope.currentUser.name,
      text: $scope.message
    });

    // clear message box
    $scope.message = '';
  };
}