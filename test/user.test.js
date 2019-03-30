var should = require("should");
var mongoose = require('mongoose');
var User = require("../src/models/user.model.js");
var db;

describe('User', function() {

  before(function(done) {
    let test_db_url = 'mongodb://localhost:27017/test';
    mongoose.connect(test_db_url);
    mongoose.Promise = global.Promise;
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    done();
  });

  after(function(done) {
    mongoose.connection.close()
    done();
  });

  beforeEach(function(done) {
    User.register(
      new User({
        roles: ['admin'],
        name: 'John Smith',
        username: '12345',
        email: 'test@example.com',
        cell_phone: '7205555555'
      }), 'testy', function(err, user) {
        if (err) console.log('Error: ' + user);
        else console.log('no error');
        done();
    });
  });

  it('find a user by username', function(done) {
      User.findOne({ username: '12345' }, function(err, user) {
        user.username.should.eql('12345');
        console.log("   username: ", user.username)
        done();
      });
  });

  afterEach(function(done) {
      User.remove({}, function() {
        done();
      });
  });

});
