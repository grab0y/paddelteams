// utils/token.js

const crypto = require('crypto');

// Generate a random token
const generateRandomToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buffer) => {
      if (err) {
        console.error('Error generating random bytes:', err); // Log error
        reject(err);
      } else {
        const token = buffer.toString('hex');
        // console.log('Generated token:', token); // Log token
        resolve(token);
      }
    });
  });
};

module.exports = generateRandomToken;
