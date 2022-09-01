const ROOM = require('../src/models/rooms')

/**
 * helper to get the list of available rooms
 * @returns available rooms
 */
const availableRooms = async () => {
   const rooms = await ROOM.find({});
   const roomsNames = []
   rooms.forEach(room => {
      roomsNames.push({ name: room.name, link: room.link })
   })
   return roomsNames
}

module.exports = { availableRooms }