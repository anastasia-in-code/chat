 /**
 * midleware for handling client errors
 * @param {object} req - request object
 * @param {object} res - response object
 */
const handleNotFound = (req, res) => {
   return res.status(404).send('Page is not found');
 };
 
 module.exports = { handleNotFound };