const express = require('express');
const router = express.Router();

module.exports = function (app) {
  app.get('/', function (req, res, next) {
    res.render('index', { user : req.user });
    next();
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
