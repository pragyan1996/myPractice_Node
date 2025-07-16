import { readFile } from 'fs';
function readJSON(filename, callback) {
    let parsed = null;
    readFile(filename, 'utf8', (err, data) => {
        if (err) {
            return callback(err); //Propagate the error and exit the current function.
        }
        try {
            parsed = JSON.parse(data);
        } catch (err) {
            return callback(err);
        }
        callback(null, parsed); //no error just propogate the data
    })
}

readJSON('valid.json', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
})