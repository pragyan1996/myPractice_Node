import { EventEmitter } from 'events';
import { readFile } from 'fs';
import { getfilename } from '../07_eventemitter_find_regex/main.js';

class FindRegex extends EventEmitter{
    constructor(regex) {
        super();
        this.regex = regex;
        this.files = [];
    }

    addFile(file) {
        this.files.push(file);
        return this;
    }

    find() {
        for (const file of this.files) {
            readFile(file, 'utf8', (err, content) => {
                if (err) {
                    return this.emit('error', err);
                }
                this.emit('fileread', content);
                const match = content.match(this.regex);
                if (match) {
                    match.forEach(elem => this.emit('found', elem));
                }
            })
        }
        return this;
    }
}

const findRegexInstance = new FindRegex(/hello \w+/);
let file1 = getfilename('data1.txt');
let file2 = getfilename('data2.txt');
findRegexInstance
    .addFile(file1)
    .addFile(file2)
    .find()
    .on('found', (file, match) => console.log(`Matched ${match} in the file ${file}`))
    .on('error',(err)=> console.log('Error occured: ',err))