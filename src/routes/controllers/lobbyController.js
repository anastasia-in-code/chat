const Room = require('../../models/rooms');
const { getAvailableRooms } = require('../../helpers/getAvailableRooms');

/**
 * function to render lobby page
 * @param {object} req - request object
 * @param {object} res - response object
 */
const lobbyPage = async (req, res, next) => {
  const rooms = await getAvailableRooms();

  const roomsNames = rooms.map((room) => ({
    name: room.name,
    // eslint-disable-next-line no-underscore-dangle
    id: room._id.toString(),
  }));

  res.render('lobby', {
    title: 'Chat | Lobby',
    roomsNames,
  });
};

/**
 * function to create a new room
 * @param {object} req
 * @param {object} res
 */
const createNewRoom = async (req, res, next) => {
  const newRoom = new Room({
    name: req.body.newRoom,
  });

  await newRoom.save();

  res.send({ newRoom });
};

module.exports = { lobbyPage, createNewRoom };
