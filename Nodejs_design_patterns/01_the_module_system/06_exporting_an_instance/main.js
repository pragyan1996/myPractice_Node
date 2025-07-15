const logger = require('./logger');
logger.log('THis is informational message.');

const temp = new logger.constructor('TEMP');
temp.log('THis is a message from temp.')