const { validationResult } = require('express-validator')
const { availableRooms } = require('../../../helpers/availableRooms')

/**
 * midleware functions for validating fields in the current Template
 * @param {string} template - the name of the template to render
 * @param {object} obj - data for template
 * @returns a Template with error messages if occured
 */
const handleValidationErrors = (template, obj) => {
   return async (req, res, next) => {
      const errors = validationResult(req)
      const emailValue = req.body.email
      const roomNameValue = req.body.newroom

      if (!errors.isEmpty()) {
         const validationErrors = errors.errors
         const errorsMsgs = {}
         for (let error of validationErrors) {
            errorsMsgs[error.param] = error.msg
         }

         const roomsNames = await availableRooms()

         return res.status(400).render(template,
            {
               errorsMsgs,
               emailValue,
               roomNameValue,
               roomsNames,
               title: obj.title
            })
      }

      next()
   }
}

module.exports = { handleValidationErrors }