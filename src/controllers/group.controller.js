const Group = require('../models/group.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Group controller!');
};
