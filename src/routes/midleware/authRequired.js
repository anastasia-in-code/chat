require('dotenv').config()
const jwt = require('jsonwebtoken')

/**
 * midleware function checks if user is authorized
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authRequired = (req, res, next) => {
   try {
      const token = req.headers.cookie

      if (!token) {
         return res.redirect('/signin')
      }

      const tokenValue = token.split('=')[1].split(';')[0]

      const decoded = jwt.verify(tokenValue, process.env.SECRETKEY)

      req.userId = decoded.id

      next()
   } catch (e) {
      res.clearCookie(`Authorization`)
      res.redirect('/signin')
   }
}

module.exports = { authRequired }