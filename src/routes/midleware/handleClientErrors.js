/**
 * midleware for handling client side errors
 * @param {object} req - request object
 * @param {object} res - response object 
 */
const handleClientErrors = (req, res) => {
   res.status(404)
   res.send('404 Sorry, something went wrong')
}

module.exports = { handleClientErrors }