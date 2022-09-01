const jwt = require('jsonwebtoken');
const config = require('../../config');

/**
 * function generates JWT token with user ID, user email and secret key
 * @param {string} id
 * @param {string} email
 * @returns JSON WEB Token
 */
const generateJWT = (id, email, exp) => {
  const payload = {
    id,
    email,
  };

  return jwt.sign(payload, config.secretKey, exp);
};

module.exports = { generateJWT };
