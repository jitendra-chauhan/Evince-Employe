const level = require('./config/level');
const logger = require('./loggerExp');

/**
 * exported functions
 * warn, info, error, debug
 */
const exportObject = {
  warn: logger.bind(null, level.warn),
  info: logger.bind(null, level.info),
  debug: logger.bind(null, level.debug),
  error: logger.bind(null, level.error),
};

module.exports = exportObject;
