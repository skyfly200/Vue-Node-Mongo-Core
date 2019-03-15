// app.js
const express = require('express');
const bodyParser = require('body-parser');

// Imports routes
const user = require('./routes/user.route');
const station = require('./routes/station.route');

// initialize our express app
const app = express();

app.use('/users', user)
app.use('/stations', station)

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
