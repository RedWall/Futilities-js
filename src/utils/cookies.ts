/*
 * From https://gist.github.com/joduplessis/7b3b4340353760e945f972a69e855d11
 * General utils for managing cookies in Typescript.
 */
export function setCookie(name: string, val: string, expirationDays = 7): void {
    const date = new Date();
    const value = val;

    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));

    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/; secure";
}

export function getCookie(name: string): string {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length === 2) {
        return parts.pop()?.split(";").shift();
    }
}

export function deleteCookie(name: string): void {
    const date = new Date();

    // Set expiration to -1 days to expire it immediately
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/; secure";
}