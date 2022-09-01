const Message = require('../models/message');
const repository = require('../models/repository');
/**
 * function to get the list of posted messages in the target room
 * @param {string} roomId  - room id to get messages for
 * @returns {Array} - array with list of posted messages
 */
const showgetRoomMessages = async (roomId) => {
  const allMessages = await Message.find({ roomId });
  const messages = [];

  const files = await repository.getAll();

  allMessages.forEach(async (message) => {
    const generatedMessage = {
      messageText: message.messageText,
      userName: message.userName,
      userColor: message.userColor,
    };
    if (message.messageFileId) {
      
      const file = files.find((file) => file.id === message.messageFileId);
      generatedMessage.file = file.file;
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

module.exports = showgetRoomMessages;
