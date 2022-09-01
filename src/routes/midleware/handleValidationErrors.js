const { validationResult } = require('express-validator');
const { getAvailableRooms } = require('../../helpers/getAvailableRooms');

/**
 * midleware functions for validating fields in the current Template
 * @param {string} template - the name of the template to render
 * @param {object} obj - data for template
 * @returns a Template with error messages if occured
 */
const handleValidationErrors = (template, obj) => async (req, res, next) => {
  const errors = validationResult(req);
  const emailValue = req.body.email;
  const roomNameValue = req.body.newroom;

  if (!errors.isEmpty()) {
    const validationErrors = errors.errors;
    const errorsMsgs = {};
    for (const error of validationErrors) {
      errorsMsgs[error.param] = error.msg;
    }

    const rooms = await getAvailableRooms();
    const roomsNames = [];
    rooms.forEach((room) => {
      roomsNames.push({ name: room.name, link: room.link });
    });

    return res.status(400).render(
      template,
      {
        errorsMsgs,
        emailValue,
        roomNameValue,
        roomsNames,
        title: obj.title,
      },
    );
  }

  next();
};

module.exports = { handleValidationErrors };
