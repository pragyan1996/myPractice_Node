import { spider } from "./spider.js";

spider('https://www.cricbuzz.com/', (err, filename, downloaded) => {
    if (err) console.error(err);
    else if (downloaded) {
        console.log(`Completed the download of ${filename}`);
    } else {
        console.log(`"${filename}" was already downloaded.`);
    }
})





