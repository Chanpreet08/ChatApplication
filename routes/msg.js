var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Chat = require('../model/chatModel');

router.route('/').
get(function(req,res){
   Chat.find({
       'room':req.query.room.toLowerCase()
   }).exec((err,msgs)=>{
       res.json(msgs);
   })
});

module.exports = router;