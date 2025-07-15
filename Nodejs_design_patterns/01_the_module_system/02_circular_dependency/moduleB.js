exports.loaded = false;
const a = require('./moduleA');
module.exports = {
    a,
    loaded: true
}