import path from 'path';
import { URL } from 'url';
import slug from 'slug';

export function urlToTFilename(url) {
    const parsedURL = new URL(url);
    const urlPath = parsedURL.pathname.split('./')
        .filter(function (component) {
            return component !== '';
        })
        .map(function (component) {
            return slug(component, {remove: null})
        })
        .join('/')
    console.log(urlPath);
    let filename = path.join(parsedURL.hostname, urlPath);
    if (!path.extname(filename).match(/htm/)) {
        filename += '.html';
    }
    return filename;
}