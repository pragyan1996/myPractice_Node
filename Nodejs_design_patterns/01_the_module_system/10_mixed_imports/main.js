//to import both the functionality from logger.js we can use the below method
import myTest, { info } from './logger.js'; //default export can be given any name but named export has predefined names.
myTest('Testing');
info('THis is also a test message.');
