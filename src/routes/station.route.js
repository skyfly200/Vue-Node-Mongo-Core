const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const station_controller = require('../controllers/station.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', station_controller.test);
module.exports = router;
