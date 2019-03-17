// --- Set up mongoose with a connection to a mongo server ---
// import dependencies
const mongoose = require('mongoose');

// Setup dev database info
const devServer = 'localhost';
const port = '27017';
const dbName = 'CRNH';
let dev_db_url = `mongodb://${devServer}:${port}/${dbName}`;
let mongoDB = process.env.MONGODB_URI || dev_db_url;

// Connect to the database
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

// Report Success or error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Export database connection from module
exports = mongoose;
//exports.db = mongoose.connection;
