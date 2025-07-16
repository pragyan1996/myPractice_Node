import { readFile } from 'fs';
const cache = new Map();

function consistentReadAsync(filename, callback) {
    if (cache.has(filename)) {
        process.nextTick(() => callback(cache.get(filename)));
    } else {
        readFile(`./${filename}`, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            cache.set(filename, data);
            callback(data);
        })
    }
}

function createFileReader(filename) {
    const listeners = [];
    consistentReadAsync(filename, (value) => {
        listeners.forEach(listener => listener(value));
    });

    return {
        onDaraReady: listener => listeners.push(listener)
    }
}

const reader1 = createFileReader('data.txt');
reader1.onDaraReady(data => {
    console.log('First call to the data: ', data);
    const reader2 = createFileReader('data.txt');
    reader2.onDaraReady(data => {
        console.log('second call to the data: ', data);
    })
})