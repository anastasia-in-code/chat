
const { logger } = require('../../helpers/logger')
/**
 * midleware for handling server errors
 * @param {object} err - error object
 * @param {object} req - request object
 * @param {object} res - response object 
 * @param {function} next - next function returns next midleware
 */
const handleServerErrors = (err, req, res, next) => {
   logger.error(err)

   res.status(502)
   res.send('502 Sorry, something went wrong')
}

module.exports = { handleServerErrors }