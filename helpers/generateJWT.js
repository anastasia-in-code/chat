require('dotenv').config()
const jwt = require('jsonwebtoken')

/**
 * function generates JWT token with user ID, user email and secret key
 * @param {string} id 
 * @param {string} email 
 * @returns JSON WEB Token
 */
const generateAccessToken = (id, email) => {
   const payload = {
      id,
      email
   }
   return jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '24h' })
}

module.exports = { generateAccessToken }