const bcrypt = require('bcryptjs');
const { generateJWT } = require('../../helpers/generateJWT');
const User = require('../../models/user');

/**
 * function to render signin page
 * @param {object} req - request object
 * @param {object} res - response object
 */
const signInPage = async (req, res, next) => {
  res.render('signin', {
    title: 'Chat | SignIn',
  });
};

/**
 * function to login user
 * @param {object} req - request object
 * @param {object} res - response object
 */
const loginUser = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ success: false });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(401).json({ success: false });
  }

  const token = generateJWT(user._id, user.email, { expiresIn: req.body.remember ? '24h' : '1h' });

  res.cookie('Authorization', token, { httpOnly: true });
  res.status(200).json({ success: true });
};
module.exports = { signInPage, loginUser };
