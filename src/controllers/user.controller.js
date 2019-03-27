const User = require('../models/user.model');
const passport = require('passport');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.create = function (req, res) {
    let user = new User({
        type: 'admin',
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        home_phone: req.body.home_phone,
        cell_phone: req.body.cell_phone
    });

    user.save( function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.login = function (req, res) {
  passport.authenticate('local', { successRedirect: '/user', failureRedirect: '/user/login', failureFlash: true })
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};

exports.read = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
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
