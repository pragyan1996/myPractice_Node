// const logger = require('./check.js');
// console.log(logger)
// logger.data();
// logger.info()

// import { count, increment } from "./check.js";

// logger.verbose('This is a function call.');

// console.log(count);
// increment();
// console.log(count);
// count++;

import { EventEmitter } from 'events';
import { readFile } from 'fs';

function findRegex(files, regex) {
    const emitter = new EventEmitter();
    for (let file of files) {
        readFile(file, 'utf8', (err, content) => {
            if (err) {
                return emitter.emit('error', err);
            }
            emitter.emit('fileread', file);
            const match = content.match(regex);
            if (match) {
                match.forEach(ele => emitter.emit('found', file, ele));
            }
        })
    }
    return emitter;
}

findRegex(['fileA.txt', 'fileB.json'], /hello \w+/g)
    .on('fileread', file => console.log(`${file} was read`))
    .on('found', (file, match) => console.log(`${match} in ${file}`))
    .on('error', err => console.error( `the error is found : ${err}`))
