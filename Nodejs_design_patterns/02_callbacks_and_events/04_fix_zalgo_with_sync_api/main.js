import { readFileSync } from 'fs';
const cache = new Map();

function consistentReadSync(filename) {
    if (cache.has(filename)) {
        return cache.get(filename);
    }
    const data = readFileSync(filename, 'utf-8');
    cache.set(filename, data);
    return data;
}

console.log(consistentReadSync('data.txt'));
console.log(consistentReadSync('data.txt'));