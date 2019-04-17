const crypto = require('crypto');
const config = require('./config');
const base64url = require('base64url');
const moment = require('moment');

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

exports.hasExpired = function (issued) {
  return moment().isAfter(moment(issued).add(config.token.value, config.token.unit));
}
