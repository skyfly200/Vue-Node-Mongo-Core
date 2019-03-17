const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);

router.post('/create', user_controller.create);

router.get('/:id', user_controller.read);

router.put('/:id/update', user_controller.update);

router.delete('/:id/delete', user_controller.delete);

module.exports = router;
