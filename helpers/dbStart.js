require('dotenv').config()
const mongoose = require('mongoose')

const dbPath = process.env.DBPATH

/**
 * function starts connection to database
 */
const dbStart = async () => {
   try {
      mongoose.connect(dbPath, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })

   } catch (e) {
      console.log(e)
   }
}


module.exports = dbStart