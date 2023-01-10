const Room = require('../../models/rooms');

const newRoomValidation = async (req, res, next) => {
  const { newRoom } = req.body;

  if (newRoom.length < 4 || newRoom.length > 20) {
    return res.status(400).send({ error: 'invalid data' });
  }

  const existingRooms = await Room.findOne({ name: newRoom });
  if (existingRooms) {
    return res.status(400).send({ error: 'invalid data' });
  }

  return next();
};

module.exports = { newRoomValidation };
