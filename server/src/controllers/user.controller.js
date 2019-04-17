const User = require('../models/user.model');
const config = require('../config');
const utils = require('../utils');
const mailgun = require('../mailgun');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Simple version, without validation or sanitation
exports.login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if(err){
        const error = new Error('An Error occured')
        return next(error);
      } else if (!user) {
        return res.json({ auth: false, err: 'Invalid Credentials' });
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the username, roles and id
        const body = { _id : user._id, username : user.username, roles: user.roles };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body },'top_secret');
        //Send back the token to the user
        return res.json({ auth: true, token: token, user: body });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

exports.create = async function (req, res) {
  // generate a validation token to store and send to user
  const emailToken = await utils.generateToken();
  try {
    // verify email deliverability before creating an account
    mailgun.sendEmail('CCRN Accounts <accounts@coloradocommunityradio.com>', req.body.email, {
      subject: "Verify Your Email",
      text: "verify",
      html: `<h1>Thanks for signing up!</h1>
            Please <a href='${config.verifyURL}/${req.body.username}/${emailToken}'>Verify Your Email</a>.`
    })
    .then( body => {
      User.create({
        roles: ['admin'],
        active: false,
        verifyEmail: {
          token: emailToken,
          issued: new Date()
        },
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        home_phone: req.body.home_phone,
        cell_phone: req.body.cell_phone
      });
      res.json({
        message : 'Signup successful',
        user : req.user,
      });
    })
    .catch( error => {
      console.error(error)
      res.json(error);
    });
  }
  catch (error) {
    res.json({error});
  }
};

exports.verifyEmail = function (req, res, next) {
    const username = req.params.username;
    User.findOne({username: username}, function (err, user) {
      if (err) {
        res.render('verifyEmail', {result: "Error: " + err});
      } else if (!user) {
        res.render('verifyEmail', {result: "Cant find user " + username});
      } else if (user.verifyEmail.token === req.params.token) { // add token timeout
        if (utils.hasExpired(user.verifyEmail.issued)) {
          res.render('verifyEmail', {result: "The token has expired"});
        } else {
          User.findOneAndUpdate({username: username}, {active: true}, {new: true}, function (err, user) {
            if (err) {
              res.render('verifyEmail', {result: "Activation failed: " + err});
            }
            res.render('verifyEmail', {result: 'Email has been verified'});
          });
        }
      } else {
        res.render('verifyEmail', {result: 'Invalid token'});
      }
    })
};

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

exports.profile = function (req, res, next) {
    if (req.params.username) {
      User.findOne({username: req.params.username}, function (err, user) {
        if (err) return next(err);
        res.send({
          joined: user.joined,
          name: user.name,
          groups: user.groups,
          profile: user.profile
        });
      })
    } else {
      res.send({err: 'Must provide a username'});
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
