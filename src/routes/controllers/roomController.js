const Room = require('../../models/rooms');
const Message = require('../../models/message');
const User = require('../../models/user');

const repository = require('../../models/repository');
const getRoomMessages = require('../../helpers/getRoomMessages');

/**
 * function to render room page
 * @param {object} req - request object
 * @param {object} res - response object
 */
const roomPage = async (req, res, next) => {
  // try {
  const currentRoom = await Room.findOne({ link: `/${req.params.room}` });
  if (!currentRoom) {
    res.status(404).send('Not found!');
  }
  const messages = await getRoomMessages(currentRoom._id.toString());

  res.render('room', {
    layout: 'roomslayout',
    title: `Chat | ${currentRoom.name}`,
    name: currentRoom.name,
    messages,
  });
  // } catch (e) {
  //   next(e);
  // }
};

/**
 * function to send new message in room
 * @param {object} req - request object
 * @param {object} res - response object
 */
const sendMessage = async (req, res, next) => {
  try {
    const currentRoom = await Room.findOne({ link: `/${req.params.room}` });
    const currentUser = await User.findOne({ _id: req.userId });

    if (req.file) {
      const file = await repository.create({ file: req.file.buffer.toString('base64') });

      const newMessage = new Message(
        {
          roomId: currentRoom._id.toString(),
          messageText: req.body.messageText,
          messageFileId: file.id,
          userName: `${currentUser.email}:`,
          userColor: currentUser.color,
        },
      );

      await newMessage.save();
    } else {
      const newMessage = new Message(
        {
          roomId: currentRoom._id.toString(),
          messageText: req.body.messageText,
          userName: `${currentUser.email}:`,
          userColor: currentUser.color,
        },
      );

      await newMessage.save();
    }

    const io = req.app.get('socketio');

    io.emit('message', req.body.messageText);

    res.redirect(`/lobby${currentRoom.link}`);
  } catch (e) {
    next(e);
  }
};

module.exports = { roomPage, sendMessage };
