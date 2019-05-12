const path = require('path');
const config = require('./config');
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const database = require('./database.js');
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('./auth');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.set('view options', { layout: false });

app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || config.sessionSecret
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// Load view routes
const views = require('./routes/view.route')(app);

// Import and register API routes
const user = require('./routes/user.route');
const role = require('./routes/role.route');
const group = require('./routes/group.route');
app.use('/users', user);
app.use('/roles', passport.authenticate('jwt', { session : false }), role);
app.use('/groups', passport.authenticate('jwt', { session : false }), group);

const dev_db_url = database.buildURI(config.dbInfo);
// If provided use DB from env variable, else use dev DB
const mongoDB = process.env.MONGODB_URI || dev_db_url;
// Set up mongoose connection
const db = database.connect(mongoDB);

// Setup Socket.io
var totalActive = 0;
var activeUsers = {};
io.on('connection', function(socket){
  // send user their core socket id
  socket.emit('socket_id', socket.id)
  // register username and core socket idea
  socket.on('register', function(socketID, username){
    // store users socket (maybe use Redis here eventualy)
    activeUsers[username] = socketID;
  });
  // update active user count
  totalActive++;
  io.emit('connections', totalActive);
  socket.on('subscribe', function(id){
    socket.join("convo-"+id);
  });
  socket.on('start_conversation', function(conversation){
    let convoID = "convo-" + conversation.id;
    // subscribe creator to new room for the conversation
    socket.join(convoID);
    for (var r of conversation.members)
      // add the new conversation to recipients in the database
      // retrieve recipients core socket ids from the DB (later maybe store them in Redis?)
      var coreSocket = activeUsers[r.username];
      // emit new_conversation event to the recipients core socket if its live
      if (coreSocket)
        socket.to(coreSocket).emit('new_conversation', convoID, conversation);
  });
  socket.on('set_properties', function(id, prop, value){
    // update conversation properties in the database
    // emit conversation_updated event to the room
    socket.to("convo-"+id).emit('conversation_updated', id, prop, value);
  });
  socket.on('set_recipients', function(id, recipients, oldRecipients, conversation){
    // update conversation recipients in the database
    // emit update_recipients event to the room
    socket.to("convo-"+id).emit('update_recipients', {id: id, recipients: recipients});
    // add new recipients
    for (var r of recipients)
      // check if recipient is new
      if (true)
        // add the new conversation to recipients in the database
        // retrieve recipients core socket ids from the DB (later maybe store them in Redis?)
        var coreSocket = activeUsers[r.username];
        console.log("add",r.username);
        // emit new_conversation event to the recipients core socket if its live
        //if (coreSocket)
          //socket.to(coreSocket).emit('removed_from_conversation', id);
    // remove any recipients in old but not new list
    for (var r of oldRecipients)
      // set the conversation as removed for recipient in the database
      // retrieve recipients core socket ids from the DB (later maybe store them in Redis?)
      var coreSocket = activeUsers[r.username];
      console.log("remove",r.username);
      // emit new_conversation event to the recipients core socket if its live
      //if (coreSocket)
        //socket.to(coreSocket).emit('new_conversation', id, conversation);
  });
  socket.on('message', function(id, msg){
    // add message to DB
    // emit message to conversation socket room
    socket.to("convo-"+id).emit('new_message', msg);
  });
  socket.on('disconnect', function(){
    // remove socket from activeUsers
    for (i in activeUsers) {
        if (activeUsers[i] === socket.id) activeUsers[i] = false;
    }
    totalActive--;
    io.emit('connections', totalActive);
  });
});

// Start express server
const port = process.env.PORT || config.expressPort;
http.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
