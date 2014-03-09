'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.users = function(){
	return User.find();
};
