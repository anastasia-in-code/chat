const fs = require('fs');
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
  const currentRoom = await Room.findById(req.params.roomId);

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
};

/**
 * function to send new message in room
 * @param {object} req - request object
 * @param {object} res - response object
 */
const sendMessage = async (req, res, next) => {
  const currentUser = await User.findById(req.userId);

  const newMessage = new Message(
    {
      roomId: req.params.roomId,
      messageText: req.body.message,
      userName: `${currentUser.email}:`,
      userColor: currentUser.color,
    },
  );

  if (req.file) {
    const savedFile = await repository.create(req.file);
    newMessage.messageFileId = `${savedFile.id}.${savedFile.format}`;
  }

  await newMessage.save();

  const io = req.app.get('socketio');

  io.emit('message', newMessage);

  res.send(newMessage);
};

const attachedFile = async (req, res, next) => {
  fs.createReadStream(`fileRepository/${req.params.fileId}`).pipe(res);
};

module.exports = { roomPage, sendMessage, attachedFile };
