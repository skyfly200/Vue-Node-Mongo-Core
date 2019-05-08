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

const User = require('./models/user.model');

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
io.on('connection', function(socket){
  totalActive++;
  io.emit('CONNECTIONS', totalActive);
  socket.on('subscribe', function(id){
    socket.join("convo-"+id);
  });
  socket.on('message', function(id, msg){
    socket.to("convo-"+id).emit('message', id, msg);
  });
  socket.on('disconnect', function(){
    totalActive--;
    io.emit('CONNECTIONS', totalActive);
  });
});

// Start express server
const port = process.env.PORT || config.expressPort;
http.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
