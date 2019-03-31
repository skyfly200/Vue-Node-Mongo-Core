const express = require('express');
const router = express.Router();
const Role = require('../models/role.model');

// Require the controllers
const role_controller = require('../controllers/role.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', role_controller.test);

router.post('/new', role_controller.create);

router.get('/:id', role_controller.read);

router.get('/', role_controller.readAll);

router.put('/:id/update', role_controller.update);

router.delete('/:id/delete', role_controller.delete);

module.exports = router;
