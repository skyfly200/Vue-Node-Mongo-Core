var path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const User = require('./models/user.model');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Load view routes
const views = require('./routes/view.route')(app);

// Import and register API routes
const user = require('./routes/user.route');
const role = require('./routes/role.route');
const station = require('./routes/station.route');
app.use('/users', user);
app.use('/roles', role);
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
