const Room = require('../models/rooms');

/**
 * helper to get the list of available rooms
 * @returns available rooms
 */
const getAvailableRooms = async () => {
  const rooms = await Room.find({});

  return rooms;
};

module.exports = { getAvailableRooms };
