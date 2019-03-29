const User = require('../models/user.model');
const passport = require('passport');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the User controller!');
};


exports.create = function (req, res) {
    User.register(
      new User({
        roles: ['admin'],
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        home_phone: req.body.home_phone,
        cell_phone: req.body.cell_phone
      }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render('register', { err : err, user : user });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
};

exports.login = [
  function (req, res, next) {
    //console.log(req.body.username);
    next();
  },
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/user/login', failureFlash: true })
];

exports.logout = function(req, res, next){
  req.logout();
  res.redirect('/');
};

exports.read = function (req, res, next) {
    let id = req.params.id;
    if (id.len === 24) {
      User.findById(id, function (err, user) {
          if (err) return next(err);
          res.send(user);
      })
    } else {
      res.send('invalid user ID');
    }
};

exports.update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send(user);
    });
};

exports.delete = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};
