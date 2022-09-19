const { generateAccessToken } = require('../../helpers/generateJWT')
const USR = require('../../models/user')

/**
 * function to render signin page
 * @param {object} req - request object
 * @param {object} res - response object
 */
const signInPage = async (req, res, next) => {
   try {
      res.render('signin', {
         title: 'Chat | SignIn'
      })

   } catch (e) {
      next(e)
   }
}

/**
 * function to login user
 * @param {object} req - request object
 * @param {object} res - response object
 */
const loginUser = async (req, res, next) => {
   try {
      if (req.headers.cookie) {
         return res.redirect('/lobby')
      } else {
         const { email } = req.body

         const user = await USR.findOne({ email })

         const token = generateAccessToken(user._id, user.email, { expiresIn: req.body.remember ? '24h' : '1h' })

         res.cookie(`Authorization`, token, { httpOnly: true })

         res.redirect('/lobby')
      }
   } catch (e) {
      next(e)
   }
}
module.exports = { signInPage, loginUser }