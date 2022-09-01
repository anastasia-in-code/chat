const Room = require('../models/rooms');

/**
 * helper to get the list of available rooms
 * @returns available rooms
 */
const getAvailableRooms = async () => await Room.find({});

module.exports = { getAvailableRooms };
