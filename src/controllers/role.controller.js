const Role = require('../models/role.model');
const passport = require('passport');

const default_actions = [];

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send('Greetings from the Role controller!');
};


exports.create = function (req, res) {
  const newRole = new Role({
    title: req.params.title,
    actions: default_actions,
  });
  newRole.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newRole);
  });
};

exports.read = function (req, res, next) {
  Role.find({title: req.params.title}, (err, people) =>{
    if (err) return res.status(500).send(err)
    return res.status(200).send(people);
  });
};

exports.update = function (req, res) {
  Role.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, role) {
      if (err) return res.status(500).send(err);
      res.send(role);
  });
};

exports.delete = function (req, res) {
  Role.findByIdAndRemove(req.params.id, function (err, role) {
    if (err) return res.status(500).send(err);
    res.send(role);
  })
};
