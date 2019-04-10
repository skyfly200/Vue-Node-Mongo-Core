const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Require the controllers
const user_controller = require('../controllers/user.controller');

// Setup passport local strategy for authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);

router.post('/new', user_controller.create);

router.post('/login', user_controller.login);

router.get('/logout', user_controller.logout);

router.get('/:id', user_controller.read);

router.put('/:id', user_controller.update);

router.delete('/:id', user_controller.delete);

module.exports = router;
