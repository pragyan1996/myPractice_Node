import { readFile } from 'fs';
const cache = new Map();

function inconsistentRead(filename, cb) {
    if (cache.has(filename)) {
        cb(cache.get(filename));
    } else {
        readFile(filename, 'utf8', (err, data) => {
            console.log(data, filename);
            cache.set(filename, data);
            cb(data);
        })
    }
}

function createFileReader(filename) {
    const listeners = [];
    inconsistentRead(filename, (value) => {
        listeners.forEach(listener => listener(value));
    })

    return {
        onDataReady: listener => listeners.push(listener)
    }
}

const reader1 = createFileReader('data.txt');
reader1.onDataReady(data => {
    console.log('first call to data: ', data);


    const reader2 = createFileReader('data.txt');
    reader2.onDataReady(data => {
        console.log('second call to data: ', data);
    })
})