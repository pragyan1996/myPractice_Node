import path from 'path';
import { URL } from 'url';
import slug from 'slug';
import * as cheerio from 'cheerio';

function getLinkURL(currentURL, element) {
    const parsedLink = new URL(element.attribs.href || '', currentURL);
    const currentParsedUR = new URL(currentURL);
    if (parsedLink.hostname != currentParsedUR.hostname || !parsedLink.pathname) {
        return null;
    }
    return parsedLink.toString();
}

export function urltofilename(url) {
    const parsedURL = new URL(url);
    const urlPath = parsedURL.pathname.split('/')
        .filter(function (component) {
            return component !== ''
        })
        .map(function (component) {
            return slug(component, { remove: null })
        })
        .join('/')
    let filename = path.join(parsedURL.hostname, urlPath)
    if (!path.extname(filename).match(/htm/)) {
        filename += '.html'
    }

    return filename
}

export function getpagelinks(currenturl, body) {
    return Array.from(cheerio.load(body)('a'))
        .map(function (element) {
            return getLinkURL(currenturl, element);
        })
        .filter(Boolean);
}