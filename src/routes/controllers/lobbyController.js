const Room = require('../../models/rooms');
const { getAvailableRooms } = require('../../helpers/getAvailableRooms');

/**
 * function to render lobby page
 * @param {object} req - request object
 * @param {object} res - response object
 */
const lobbyPage = async (req, res, next) => {
  try {
    const rooms = await getAvailableRooms();
    const roomsNames = [];
    rooms.forEach((room) => {
      roomsNames.push({ name: room.name, link: room.link });
    });

    res.render('lobby', {
      title: 'Chat | Lobby',
      roomsNames,
    });
  } catch (e) {
    next(e);
  }
};

/**
 * function to create a new room
 * @param {object} req
 * @param {object} res
 */
const createNewRoom = async (req, res, next) => {
  try {
    const newRoom = new Room({
      name: req.body.newroom,
      link: `/${req.body.newroom.replace(' ', '_')}`,
    });

    await newRoom.save();

    res.redirect('/lobby');
  } catch (e) {
    next(e);
  }
};

module.exports = { lobbyPage, createNewRoom };
