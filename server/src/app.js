var path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const database = require('./database.js');

const User = require('./models/user.model');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'awesomecookiesecret'
}));
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
const group = require('./routes/group.route');
app.use('/users', user);
app.use('/roles', role);
app.use('/groups', group);

// Define dev database info
const dbInfo = {
  host: 'localhost',
  port: '27017',
  db: 'CRNH'
};
const dev_db_url = database.buildURI(dbInfo);
// If provided use DB from env variable, else use dev DB
const mongoDB = process.env.MONGODB_URI || dev_db_url;
// Set up mongoose connection
const db = database.connect(mongoDB);

// Start express server
const port = process.env.PORT || 1234;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
