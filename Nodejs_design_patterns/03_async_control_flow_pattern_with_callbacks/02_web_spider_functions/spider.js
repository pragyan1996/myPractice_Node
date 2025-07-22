import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToTFilename } from './utils.js';

function savefile(filename, contents, cb) {
    mkdirp(path.dirname(filename), err => {
        if (err) {
            return cb(err);
        }
        fs.writeFile(filename, contents, cb);
    })
}

function download(url, filename, cb) {
    console.log(url)
    console.log(`downloading ${url}`);
    superagent.get(url).end((err, res) => {
        if (err) {
            return cb(err);
        }
        savefile(filename, res.text, (err) => {
            if (err) {
                return cb(err);
            }
            console.log(`Downloaded and saved: ${url}`);
            cb(null, res.text);
        })
    })
}

export function spider(url, cb) {
    const filename = urlToTFilename(url);
    fs.access(filename, err => {
        if (!err || err.code != 'ENOENT') {
            return cb(null, filename, false);
        }
        download(url, filename, err => {
            if (err) return cb(err);
            cb(null, filename, true);
        })
    })
}