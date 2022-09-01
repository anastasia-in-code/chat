const express = require('express');
const {
  requireEmail, requirePassword, requireEmailExists, requireValidPasswordForUser,
} = require('./validators');
const { handleValidationErrors } = require('./midleware/handleValidationErrors');
const { signUpPage, registerNewUser } = require('./controllers/signupController');
const { signInPage, loginUser } = require('./controllers/signinController');

const router = express.Router();

router.get('/signup', signUpPage);

router.post(
  '/signup',
  requireEmail,
  requirePassword,
  handleValidationErrors(
    'signup',
    { title: 'Chat | SignUp' },
  ),
  registerNewUser,
);

router.get('/signin', signInPage);

router.post(
  '/signin',
  requireEmailExists,
  requireValidPasswordForUser,
  handleValidationErrors('signin', {
    title: 'Chat | SignIn',
  }),
  loginUser,
);

router.get('/signout', (req, res) => {
  res.clearCookie('Authorization');
  res.redirect('/signin');
});

router.get('/', (req, res) => {
  res.redirect('/lobby');
});

module.exports = router;
