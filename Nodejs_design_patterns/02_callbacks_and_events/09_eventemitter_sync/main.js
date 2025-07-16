import { EventEmitter } from 'events';
import { readFileSync } from 'fs';
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
            let content;
            try {
                content = readFileSync(file, 'utf8');
            } catch (error) {
                this.emit('error', error);
            }
            this.emit('fileread', file);
            const match = content.match(this.regex);
            if (match) {
                match.forEach(elem => this.emit('found', file, elem));
            }
        }
        return this;
    }
}

let file1 = getfilename('data.txt');
let file2 = getfilename('data2.txt');

const findRegex = new FindRegex(/hello \w+/);
findRegex
    .addFile(file1)
    .addFile(file2)
    .on('found', (file, match) => {
        console.log(file, match);
    })
    .find()
    .on('found', () => console.log('match found')) //in sync call all the events should be triggered before found as it is sync call and none will be invoked after the find.
    