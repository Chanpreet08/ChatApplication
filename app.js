var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var setup = require('./routes/setup');
var msg = require('./routes/msg');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// mongoose.connect('mongodb://127.0.0.1:27017/chat_application');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

io.on('connection',(socket=>{
  console.log('a user is connected');
}))

server.listen(3005,function(){
  console.log('listening on 3005');
});


// app.use('/setup', setup);
// app.use('/msg',msg);


// io.on('connection', function(socket) {
//   //Globals
//   var defaultRoom = 'general';
//   var rooms = ["General", "angular", "socket.io", "express", "node", "mongo", "PHP", "laravel"];

//   socket.emit('setup', {
//     rooms: rooms
//   });

  
//   socket.on('new user', function(data) {
//     data.room = defaultRoom;
    
//     socket.join(defaultRoom);
    
//     io.in(defaultRoom).emit('user joined', data);
//   });

//   //Listens for switch room
//   socket.on('switch room', function(data) {
    
//     socket.leave(data.oldRoom);
//     socket.join(data.newRoom);
//     io.in(data.oldRoom).emit('user left', data);
//     io.in(data.newRoom).emit('user joined', data);

//   });

  
//   socket.on('new message', function(data) {
    
//     var newMsg = new Chat({
//       username: data.username,
//       content: data.message,
//       room: data.room.toLowerCase(),
//       created: new Date()
//     });
    
//         newMsg.save(function(err, msg){
      
//       io.in(msg.room).emit('message created', msg);
//     });
//   });
// });

// server.listen(2015);
// console.log('It\'s going down in 2015');

// app.all('*',function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
//    if (req.method == 'OPTIONS') {
//     res.status(200).end();
//   } else {
//     next();
//   }
// })

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
