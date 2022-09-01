const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
   roomId: {
      type: String,
      required: true
   },
   messageText: {
      type: String
   },
   messageFileId: {
      type: String
   },
   userName: {
      type: String
   },
   userColor: {
      type: String
   }
})
const MESSAGE = mongoose.model('MESSAGE', messageSchema)

module.exports = MESSAGE