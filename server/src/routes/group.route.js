const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const group_controller = require('../controllers/group.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', group_controller.test);
module.exports = router;
