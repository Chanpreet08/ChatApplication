var mongoose = require('mongoose');
var chatSchema = mongoose.Schema({
    created:Date,
    content:String,
    username:String,
    room:String
});

var chat = mongoose.model('chats',chatSchema);
module.exports = chat;