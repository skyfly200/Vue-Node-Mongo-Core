const crypto = require('crypto');
const base64url = require('base64url');

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
