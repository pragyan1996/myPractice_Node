import fs from 'fs';
import { mockEnable, mockDisable } from './mock_read_file';

mockEnable(Buffer.from("Hello world"));

fs.readFile('fake-path', (err, data) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(data.toString());
})

mockDisable();