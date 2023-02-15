require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRETKEY,
  dbPath: process.env.DBPATH,
  host: process.env.HOST,
};

module.exports = config;
