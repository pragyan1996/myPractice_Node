import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urltofilename, getpagelinks } from './utils.js'

function saveFile(filename, contents, cb) {
    mkdirp(path.dirname(filename), err => {
        if (err) {
            return cb(err);
        }
        fs.writeFile(filename, contents, cb);
    })
}

function download(url, filename, cb) {
    console.log(`Downloading ${url}`);
    superagent.get(url).end((err, res) => {
        if (err) {
            return cb(err);
        }
        saveFile(filename, res.text, err => {
            if (err) return cb(err);
            console.log(`Downloaded and saved: ${url}`);
            cb(null, res.text);
        })
    })
}

function spiderLinks(currentUrl, body, nesting, cb) {
    if (nesting === 0) {
        // Remember Zalgo?
        return process.nextTick(cb)
    }

    const links = getpagelinks(currentUrl, body) // [1]
    if (links.length === 0) {
        return process.nextTick(cb)
    }

    function iterate(index) { // [2]
        if (index === links.length) {
            return cb()
        }

        spider(links[index], nesting - 1, function (err) { // [3]
            if (err) {
                return cb(err)
            }
            iterate(index + 1)
        })
    }

    iterate(0) // [4]
}

export function spider(url, nesting, cb) {
    const filename = urltofilename(url);
    fs.readFile(filename, 'utf8', (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                return cb(err);
            }

            //the file doesn't exist so let's download it.
            return download(url, filename, (err, content) => {
                if (err) return cb(err);
                spiderLinks(url, content,nesting, cb);
            })
        }
        spiderLinks(url, content, nesting, cb);
    })
}