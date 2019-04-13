const User = require('../models/user.model');
const config = require('../config');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the User controller!');
};

exports.signup = async (req, res, next) => {
  passport.authenticate('signup', { session : false }) , async (req, res, next) => {
    res.json({
      message : 'Signup successful',
      user : req.user,
    });
  };
};

exports.login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {     try {
      if(err || !user){
        const error = new Error('An Error occured')
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the username and id
        const body = { _id : user._id, username : user.username };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body },'top_secret');
        //Send back the token to the user
        return res.json({ token });
      });     } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

// exports.create = function (req, res) {
//     User.register(
//       new User({
//         roles: ['admin'],
//         name: req.body.name,
//         username: req.body.username,
//         email: req.body.email,
//         home_phone: req.body.home_phone,
//         cell_phone: req.body.cell_phone
//       }), req.body.password, function(err, user) {
//         if (err) {
//             console.log(err);
//             return res.render('register', { err : err, user : user });
//         }
//
//         passport.authenticate('local')(req, res, function () {
//           let token = jwt.sign({ id: user.id }, config.tokenSecret, { expiresIn: 86400});
//           res.redirect('/');
//         });
//     });
// };
//
// exports.login_old = [
//   function (req, res, next) {
//     //console.log(req.body.username);
//     next();
//   },
//   passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true })
// ];

exports.logout = function(req, res, next){
  req.logout();
  res.redirect('/');
};

exports.read = function (req, res, next) {
    let id = req.params.id;
    if (id.length === 24) {
      User.findById(id, function (err, user) {
        if (err) return next(err);
        res.send(user);
      })
    } else {
      res.send('invalid user ID');
    }
};

exports.update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, user) {
        if (err) return next(err);
        res.send(user);
    });
};

exports.delete = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};
