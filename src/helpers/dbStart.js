const mongoose = require('mongoose')
require('dotenv').config()

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
