const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const user_controller = require('../controllers/user.controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/register', user_controller.create);

router.get('/verify/:type/:username/:token', user_controller.verifyToken);

router.get('/resend/:username', user_controller.resendEmailVerify);

router.post('/login', user_controller.login);

router.get('/logout', user_controller.logout);

router.get('/profile/:username', user_controller.profile);

router.get('/:id', user_controller.read);

router.put('/:id', user_controller.update);

router.delete('/:id', user_controller.delete);

module.exports = router;
