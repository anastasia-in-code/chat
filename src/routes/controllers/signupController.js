const bcrypt = require('bcryptjs');
const { generateColor } = require('../../helpers/generateColor');
const User = require('../../models/user');

/**
 * function to render the signup page
 * @param {object} req - request object
 * @param {object} res - response object
 */
const signUpPage = (req, res) => {
  res.render('signup', {
    title: 'Chat | SignUp',
  });
};

/**
 * function to register new user
 * @param {object} req - request object
 * @param {object} res - reqponse object
 */
const registerNewUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.send({ error: 'This email already in use' });
  }

  const hashPassword = await bcrypt.hash(password, 9);

  const newUser = new User({
    email: req.body.email,
    password: hashPassword,
    color: generateColor(),
  });

  await newUser.save();

  res.status(200)
};

module.exports = { signUpPage, registerNewUser };
