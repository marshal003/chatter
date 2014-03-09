'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Chat Schema
 */
var ChatSchema = new Schema({
  text: String,
  user: String,
  date: Date,
  group: String
});

mongoose.model('Chat', ChatSchema);
