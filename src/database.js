// --- Set up mongoose with a connection to a mongo server ---
// import dependencies
const mongoose = require('mongoose');

exports.buildURI = function (dbInfo) {
  return `mongodb://${dbInfo.host}:${dbInfo.port}/${dbInfo.db}`;
}

exports.connect = function (mongoDB) {
  // Connect to the database
  mongoose.connect(mongoDB, {useNewUrlParser: true});
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;

  // Report success or error
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('connected', console.log.bind(console, 'Mongoose connected to ', mongoDB));

  return db;
}
