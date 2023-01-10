const express = require('express');
const multer = require('multer');
const { signUpPage, registerNewUser } = require('./controllers/signupController');
const { signInPage, loginUser } = require('./controllers/signinController');
const { asyncWrapper } = require('./midleware/asyncWrapper')


const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get('/signup', signUpPage);

router.post(
  '/signup',
  upload.single('file'),
  asyncWrapper(registerNewUser)
);

router.get('/signin', asyncWrapper(signInPage));

router.post(
  '/signin',
  upload.single('file'),
  asyncWrapper(loginUser)
);

router.post('/signout', (req, res) => {
  res.clearCookie('Authorization');
  res.status(302).json({ success: true });
});

router.get('/', (req, res) => {
  res.redirect('/lobby');
});

module.exports = router;
