const ROOM = require('../../models/rooms')
const MESSAGE = require('../../models/message')
const USR = require('../../models/user')

const repository = require('../../models/repository')
const roomMessages = require('../../helpers/roomMessages')

/**
 * function to render room page
 * @param {object} req - request object
 * @param {object} res - response object
 */
const roomPage = async (req, res, next) => {
   try {
      const currentRoom = await ROOM.findOne({ link: `/${req.params.room}` })

      const messages = await roomMessages(currentRoom._id.toString())

      res.render('room', {
         layout: 'roomslayout',
         title: `Chat | ${currentRoom.name}`,
         name: currentRoom.name,
         messages,
      })
   } catch (e) {
      next(e)
   }
}

/**
 * function to send new message in room
 * @param {object} req - request object
 * @param {object} res - response object
 */
const sendMessage = async (req, res, next) => {
   try {
      const currentRoom = await ROOM.findOne({ link: `/${req.params.room}` })
      const currentUser = await USR.findOne({ _id: req.userId })

      if (req.file) {
         const file = await repository.create({ file: req.file.buffer.toString('base64') })

         const newMessage = new MESSAGE(
            {
               roomId: currentRoom._id.toString(),
               messageText: req.body.messageText,
               messageFileId: file.id,
               userName: `${currentUser.email}:`,
               userColor: currentUser.color
            }
         )

         await newMessage.save()
      } else {
         const newMessage = new MESSAGE(
            {
               roomId: currentRoom._id.toString(),
               messageText: req.body.messageText,
               userName: `${currentUser.email}:`,
               userColor: currentUser.color
            }
         )

         await newMessage.save()
      }

      const messages = await roomMessages(currentRoom._id.toString())

      const io = req.app.get('socketio');

      io.emit('message', req.body.messageText)

      res.render('room', {
         layout: 'roomslayout',
         title: `Chat | ${currentRoom.name}`,
         name: currentRoom.name,
         messages
      })
   } catch (e) {
      next(e)
   }
}

module.exports = { roomPage, sendMessage }
