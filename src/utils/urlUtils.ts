import { isNullOrWhitespace } from "./stringUtils";

export interface ReturnUrlInfo {
    returnPageTitle: string;
    returnUrl: string;
    isNewWindow: boolean;
}

export function extractParamsFromUrl() : any {

    const urlParams = new URLSearchParams(window.location.search);

    const result = {}

    for (const [key, value] of urlParams.entries()) {

        result[key] = value
    }

    return result
}

export function appendReturnUrlFromCurrentPage(targetUrl: string, origin?: string, ...params: { name: string, value: string }[]): string {
    let url: URL = null;

    if (!isNullOrWhitespace(origin)) {
        url = new URL(targetUrl, origin);
    } else {
        url = new URL(targetUrl);
    }

    let currPage = new URL(document.location.href);
    let currPageTitle = document.title;

    const titleParts = document.title.split(" - ");

    if (titleParts && titleParts.length > 2) {
        currPageTitle = titleParts.slice(0, -1).join(" ");
    }

    url.searchParams.append('returnTitle', currPageTitle);

    for (let param of params) {
        if (param)
            currPage.searchParams.append(param.name, encodeURIComponent(param.value));
    }

    url.searchParams.append('returnUrl', currPage.toString());

    return makeRelativeUrl(url);
}
export function getReturnUrlInfoFromCurrentPage(): ReturnUrlInfo {
    const currUrl = new URL(window.location.href);
    const returnPageTitle = currUrl.searchParams.get('returnTitle');
    const returnUrl = currUrl.searchParams.get('returnUrl');
    const isNewWindow = currUrl.searchParams.get('isNewWindow') === 'true';

    return {
        returnPageTitle: returnPageTitle,
        returnUrl: returnUrl,
        isNewWindow: isNewWindow
    };
}

export function appendNewWindowToken(targetUrl: string, origin?: string): string {
    let url: URL = null;

    if (!isNullOrWhitespace(origin)) {
        url = new URL(targetUrl, origin);
    } else {
        url = new URL(targetUrl);
    }

    url.searchParams.append('isNewWindow', 'true');

    return makeRelativeUrl(url);
}

export function makeRelativeUrl(targetUrl: URL): string {
    return targetUrl.pathname + targetUrl.search;
}

export function slugify(phrase: string): string {
    let interimStr = phrase.toLowerCase();
    // invalid chars
    interimStr = interimStr.replace(/[^a-z0-9\s-]/gi, "");
    // convert multiple spaces into one space
    interimStr = interimStr.replace(/\s+/gm, " ").trim();
    // cut and trim
    interimStr = interimStr.substring(0, interimStr.length <= 45 ? interimStr.length : 45).trim();
    interimStr = interimStr.replace(/\s/gm, "-"); // hyphens

    return interimStr;
}
