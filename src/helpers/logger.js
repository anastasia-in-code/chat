const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf } = format;

/**
 * function is used to build custom format of logs
 */
const myFormat = printf(({
  level, message, timestamp, stack,
}) => `${timestamp} ${level}: ${stack || message}`);

/**
 * loger instanse with settings
 */
const logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    myFormat,
  ),
  defaultMeta: { service: 'user-service' },
  level: 'debug',

  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = { logger };
