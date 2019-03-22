// initialize our express app
const express = require('express');
const app = express();

// Config Express Middleware
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Imports routes
const user = require('./routes/user.route');
const station = require('./routes/station.route');

// register router paths
app.use('/users', user);
app.use('/stations', station);

// Set up mongoose connection
// const mongoose = require('./database.js');
// let db = mongoose.connection;
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/CRNH';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Start server
let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
