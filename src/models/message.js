const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  messageText: {
    type: String,
  },
  messageFileId: {
    type: String,
  },
  messageFileName: {
    type: String,
  },
  userName: {
    type: String,
  },
  userColor: {
    type: String,
  },
});
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
