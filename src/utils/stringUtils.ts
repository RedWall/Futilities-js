export function isNullOrWhitespace(str: string | null | undefined) {
    if (typeof str === 'undefined' || str === null) return true;
    return str.trim().length < 1;
}

export function humanize(str) {
    return str
        .replace(/^[\s_]+|[\s_]+$/g, '')
        .replace(/[_\s]+/g, ' ')
        .replace(/[a-z][A-Z]/g, function (m) { return `${m[0]} ${m[1].toUpperCase()}`; })
        .replace(/^[a-z]/, function (m) { return m.toUpperCase(); });
}