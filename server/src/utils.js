const crypto = require('crypto');
const config = require('./config');
const base64url = require('base64url');
const moment = require('moment');
const User = require('./models/user.model');

exports.generateToken = function ({ stringBase = 'base64', byteLength = 48 } = {}) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(byteLength, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(base64url.fromBase64(buffer.toString(stringBase)));
      }
    });
  });
}

exports.verifyUserToken = function (type, username, token) {
  return new Promise((resolve, reject) => {
    User.findOne({username: username}, function (err, user) {
      if (err) {
        reject(Error(err));
      } else if (!user) {
        resolve({valid: false, message: "Cant find user" + username});
      } else {
        let storedToken = user.tokens[type];
        if (storedToken.token === token) {
          const expired = moment().isAfter(moment(storedToken.issued).add(config.token.expires.value, config.token.expires.unitCode));
          if (expired) {
            resolve({valid: false, message: "The token has expired"});
          } else {
            resolve({valid: true});
          }
        } else {
          resolve({valid: false, message: "Invalid Token"});
        }
      }
    })
  });
}
