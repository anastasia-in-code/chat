const Message = require('../models/message');

/**
 * function to get the list of posted messages in the target room
 * @param {string} roomId  - room id to get messages for
 * @returns {Array} - array with list of posted messages
 */
const getRoomMessages = async (roomId) => {
  const allMessages = await Message.find({ roomId });
  const messages = [];

  allMessages.forEach(async (message) => {
    const generatedMessage = {
      messageText: message.messageText,
      userName: message.userName,
      userColor: message.userColor,
    };

    if (message.messageFileId) {
      generatedMessage.file = message.messageFileId;
      generatedMessage.fileName = message.messageFileName;
    }

    messages.push(generatedMessage);
  });

  if (!messages.length) {
    messages.push({
      messageText: 'There are no messages yet',
    });
  }

  return messages;
};

module.exports = getRoomMessages;
