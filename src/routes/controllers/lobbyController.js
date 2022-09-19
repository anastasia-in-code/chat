const ROOM = require('../../models/rooms')
const { availableRooms } = require('../../helpers/availableRooms')

/**
 * function to render lobby page
 * @param {object} req - request object
 * @param {object} res - response object
 */
const lobbyPage = async (req, res) => {
   try {
      res.render('lobby', {
         title: 'Chat | Lobby',
         roomsNames: await availableRooms()
      })
   } catch (e) {
      next(e)
   }
}

/**
 * function to create a new room
 * @param {object} req 
 * @param {object} res 
 */
const createNewRoom = async (req, res) => {
   try {
      const newRoom = new ROOM({
         name: req.body.newroom,
         link: `/${req.body.newroom.replace(' ', '_')}`
      })

      await newRoom.save()

      res.redirect('/lobby')
   } catch (e) {
      next(e)
   }
}

module.exports = { lobbyPage, createNewRoom }