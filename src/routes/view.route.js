const express = require('express');
const router = express.Router();

// Require the controllers
const user_controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', { user : req.user });
  });

  app.get('/register', function(req, res) {
      res.render('register', { });
  });

  app.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });
};
