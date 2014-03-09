'use strict';

var mongoose = require('mongoose'),
    Chat = mongoose.model('Chat');

/**
 * Get Previous Chat for the given group
 */
exports.chats = function(req, res) {
 var groupId = req.params.group; 
  return Chat.find(function (err, chats) {
    if (!err) {
      return res.json(chats);
    } else {
      return res.send(err);
    }
  });
};
exports.deleteChats = function(req, res){
	var groupId = req.params.groupId,
	chatId = req.params.chatId; 
	return Chat.find({'_id': chatId}).remove().exec(function(err, data){
		 if (!err) {
		  return data
		} else {
		  return err;
		}
	});
};