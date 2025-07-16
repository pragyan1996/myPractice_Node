import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EventEmitter } from 'events';
const readFile = fs.readFile;

export function getfilename(file_name) {
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    const filepath = path.join(dirname, file_name)
    return filepath;
}

function findRegex(files, regex) {
    const emitter = new EventEmitter();
    for (const file of files) {
        readFile(file, 'utf8', (err, content) => {
            if (err) {
                return emitter.emit('error', err);
            }
            emitter.emit('fileread', content);
            const match = content.match(regex);
            if (match) {
                match.forEach(elem => emitter.emit('found', file, elem));
            }
        })
    }
    return emitter;
}

let fileName1 = getfilename('data.txt');
let filename2 = getfilename('data2.txt');

findRegex([fileName1, filename2], /hello \w+/g)
    .on('fileread', file => {
        console.log(`the file is read: ${file}`);
    })
    .on('found', (file, match) => console.log(`Match found: ${match} in ${file} file.`))
    .on('error', err => console.log('Error is generated: ', err))