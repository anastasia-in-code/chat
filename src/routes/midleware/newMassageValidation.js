const newMessageValidation = async (req, res, next) => {
  if (req.body.message.length > 1000) {
    return res.status(400).send({ error: 'invalid data' });
  }

  return next();
};

module.exports = { newMessageValidation };
