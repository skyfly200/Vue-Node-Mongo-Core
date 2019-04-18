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
        // We don't want to store the sensitive information such as the
        // user password in the token so we pick only the username, roles and id
        const body = { _id : user._id, username : user.username, roles: user.roles, active: user.active };
        // Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body },'top_secret');
        // Send back the token to the user
        return res.json({ auth: true, token: token, user: body });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

exports.create = async function (req, res, next) {
  // generate a validation token to store and send to user
  const emailToken = await utils.generateToken();
  try {
    // verify email deliverability before creating an account
    mailgun.sendEmail('CCRN Accounts <accounts@coloradocommunityradio.com>', req.body.email, {
      subject: "Verify Your Email",
      text: "verify",
      html: `<h1>Thanks for signing up!</h1>
            <p>Please click the button below to verify your email address.</p>
            <a href='${config.token.verifyURL}/${'email'}/${req.body.username}/${emailToken}'>
            <button>Verify Email</button></a>
            <p>This link will expire in ${config.token.expires.value} ${config.token.expires.unit}s</p>`
    })
    .then( body => {
      User.create({
        roles: ['admin'],
        active: false,
        tokens: {
          email: {
            token: emailToken,
            issued: new Date()
          }
        },
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        home_phone: req.body.home_phone,
        cell_phone: req.body.cell_phone,
        profile: [
          {title: "Bio", value: ""},
          {title: "Favorite Color", value: ""},
          {title: "Favorite Instrument", value: ""}
        ]
      });
      res.json({
        message : 'Signup successful',
        user : req.user,
      });
    })
    .catch( error => {
      console.error(error);
      res.json(error);
    });
  }
  catch (error) {
    res.json({error});
  }
};

exports.resendEmailVerify = async function (req, res, next) {
  // generate a validation token to store and send to user
  const emailToken = await utils.generateToken();
  const username = req.params.username;
  try {
    User.findOne({username: username}, function (err, user) {
      if (err || !user) return res.send(400);
      // verify email deliverability before creating an account
      mailgun.sendEmail('CCRN Accounts <accounts@coloradocommunityradio.com>', user.email, {
        subject: "Verify Your Email",
        text: "verify",
        html: `<h1>Thanks for signing up!</h1>
              <p>Please click the button below to verify your email address.</p>
              <a href='${config.token.verifyURL}/${'email'}/${username}/${emailToken}'>
              <button>Verify Email</button></a>
              <p>This link will expire in ${config.token.expires.value} ${config.token.expires.unit}s</p>`
      })
      .then( body => {
        User.findOneAndUpdate({username: username}, {
          tokens: {email: { token: emailToken, issued: new Date() }}
        }, {new: true}, function (err, user) {
          if (err) return console.error(err);
          res.send({message: 'Sent'});
        });
      })
      .catch( error => {
        console.error(error);
        res.json(error);
      });
    });
  }
  catch (error) {
    res.json({error});
  }
}

exports.verifyToken = function (req, res, next) {
    const {type, username, token} = req.params;
    utils.verifyUserToken(type, username, token)
    .then( (result) => {
      if (result.valid) {
        User.findOneAndUpdate({username: username}, {active: true}, {new: true}, function (err, user) {
          if (err) {
            res.render('verifyEmail', {result: "Activation Error: " + err});
          } else if (!user) {
            res.render('verifyEmail', {result: "User Lookup Failed"});
          } else {
            res.render('verifyEmail', {result: 'Your email has been verified'});
          }
        });
      } else {
        res.render('verifyEmail', {result: result.message});
      }
    })
    .catch( (error) => res.render('verifyEmail', {result: "An error occured: " + error}) );
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
          bio: user.bio,
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

exports.update = function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, user) {
      if (err) return next(err);
      res.send(user);
  });
};

exports.delete = function (req, res, next) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
      if (err) return next(err);
      res.send(user);
  })
};
