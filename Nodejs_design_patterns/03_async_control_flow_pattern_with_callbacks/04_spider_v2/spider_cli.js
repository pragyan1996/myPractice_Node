import { spider } from './spider.js'

const url = 'https://www.cricbuzz.com/'
const nesting = 2

spider(url, nesting, err => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    console.log('Download complete')
})