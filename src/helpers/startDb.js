const mongoose = require('mongoose');
const { logger } = require('./logger');

/**
 * a functions needed to connect to DB
 * @param {string} the path to db (stored in config)
 */
const startDb = async (dbPath) => {
  try {
    await mongoose.connect(dbPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    process.kill(process.pid);
    logger.error(err);
  }
};

module.exports = startDb;
