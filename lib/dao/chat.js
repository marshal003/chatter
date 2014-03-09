'use strict';

var mongoose = require('mongoose'),
    Chat = mongoose.model('Chat');

exports.save = function(message){
	var chat = new Chat(message);
	chat.save(function(err, chat){
		if(!err){
			console.log("Chat saved");
			return {id: chat._id};
		}else{
			return err;
		}
	});
};
/**
 * Get Previous Chat for the given group
 */
exports.chats = function(groupId) {
  return Chat.find({'group': groupId}, function (err, chats) {
    if (!err) {
      return chats;
    } else {
      return err;
    }
  });
};
