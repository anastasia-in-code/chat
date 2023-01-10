const { logger } = require('../../helpers/logger');
/**
 * midleware for handling server errors
 * @param {object} err - error object
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function returns next midleware
 */
const handleServerErrors = (error, req, res, next) => {
  logger.error(error);

  return res.status(502).send('Sorry, something went wrong(((((');
};

module.exports = { handleServerErrors };
