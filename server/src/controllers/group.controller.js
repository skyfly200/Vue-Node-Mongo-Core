const Group = require('../models/group.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Group controller!');
};

exports.create = function (req, res) {
  const newGroup = new Group({
    name: req.body.name,
    creator: req.body.creator,
    email: req.body.email,
    web_url: req.body.url,
    phone: req.body.phone
  });
  newGroup.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newGroup);
  });
};

exports.read = function (req, res, next) {
  Group.find({name: req.params.name}, (err, groups) =>{
    if (err) return res.status(500).send(err)
    return res.status(200).send(groups);
  });
};

exports.readAll = function (req, res, next) {
  Group.find((err, groups) =>{
    if (err) return res.status(500).send(err)
    return res.status(200).send(groups);
  });
};

exports.update = function (req, res) {
  Group.findOneAndUpdate({name: req.params.name}, {$set: req.body}, {new: true}, function (err, group) {
      if (err) return res.status(500).send(err);
      res.send(group);
  });
};

exports.delete = function (req, res) {
  Group.findOneAndRemove({name: req.params.name}, function (err, group) {
    if (err) return res.status(500).send(err);
    res.send(group);
  })
};
