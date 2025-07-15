exports.loaded = false;
const b = require('./moduleB');
module.exports = {
    b,
    loaded: true
};