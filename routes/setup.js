var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var Chat = require('../model/chatModel');

router.use(morgan('dev'));
router.route('/').post(function (req, res) {

  chatData = [{
    created: new Date(),
    content: 'Hi',
    username: 'Chris',
    room: 'php'
  }, {
    created: new Date(),
    content: 'Hello',
    username: 'Obinna',
    room: 'laravel'
  }, {
    created: new Date(),
    content: 'Ait',
    username: 'Bill',
    room: 'angular'
  }, {
    created: new Date(),
    content: 'Amazing room',
    username: 'Patience',
    room: 'socet.io'
  }];

  for (let c = 0; c < chatData.length; c++) {
    let newChat = new Chat(chatData[c]);
    newChat.save(data => {
      console.log(data);
    }, err => {
      console.log('error in saving');
    });

  }

  res.end('created');
});

module.exports = router;


