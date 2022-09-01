require('dotenv').config()
const express = require('express')
const router = express.Router()

const { requireEmail, requirePassword, requireEmailExists, requireValidPasswordForUser } = require('./validators')
const { handleValidationErrors } = require('./midleware/handleValidationErrors')
const { signUpPage, registerNewUser } = require('./controllers/signupController')
const { signInPage, loginUser } = require('./controllers/signinController')

router.get('/signup', signUpPage);

router.post('/signup',
   [requireEmail, requirePassword],
   handleValidationErrors('signup',
      { title: 'Chat | SignUp' }),
   registerNewUser
)

router.get('/signin', signInPage)

router.post('/signin',
   [requireEmailExists, requireValidPasswordForUser],
   handleValidationErrors('signin', {
      title: 'Chat | SignIn'
   }),
   loginUser
)


// update signout!!!!!!!!!!!!!!!!!!!!!
router.get('/signout', (req, res) => {
   req.session = null
   res.redirect('/signup')
})

module.exports = router;

