const a = require('./moduleA');
const b = require('./moduleB');
console.log(`a -> ${JSON.stringify(a, null, 2)}`);
console.log(`b -> ${JSON.stringify(b, null, 2)}`);
