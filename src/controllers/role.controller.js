const Role = require('../models/role.model');
const passport = require('passport');

const default_actions = [];

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send('Greetings from the Role controller!');
};


exports.create = function (req, res) {
  new Role({
    title: req.params.title,
    actions: default_actions,
  });
};

exports.read = function (req, res, next) {
    let id = req.params.id;
    if (id.length === 24) {
      Role.findById(id, function (err, user) {
        if (err) return next(err);
        res.send(role);
      })
    } else {
      res.send('invalid user ID');
    }
};

exports.update = function (req, res) {
    Role.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, role) {
        if (err) return next(err);
        res.send(role);
    });
};

exports.delete = function (req, res) {
  Role.findByIdAndRemove(req.params.id, function (err, role) {
        if (err) return next(err);
        res.send(role);
    })
};
