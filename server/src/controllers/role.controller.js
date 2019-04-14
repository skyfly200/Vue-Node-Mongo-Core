const Role = require('../models/role.model');
const passport = require('passport');

const default_actions = [];

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send('Greetings from the Role controller!');
};

exports.create = function (req, res) {
  const newRole = new Role({
    title: req.body.title,
    actions: default_actions,
  });
  newRole.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newRole);
  });
};

exports.read = function (req, res, next) {
  Role.find({title: req.params.title}, (err, roles) =>{
    if (err) return res.status(500).send(err)
    return res.status(200).send(roles);
  });
};

exports.readAll = function (req, res, next) {
  Role.find((err, roles) =>{
    if (err) return res.status(500).send(err)
    return res.status(200).send(roles);
  });
};

exports.update = function (req, res) {
  Role.findOneAndUpdate({title: req.params.title}, {$set: req.body}, {new: true}, function (err, role) {
      if (err) return res.status(500).send(err);
      res.send(role);
  });
};

exports.delete = function (req, res) {
  Role.findOneAndRemove({title: req.params.title}, function (err, role) {
    if (err) return res.status(500).send(err);
    res.send(role);
  })
};
