export function isNullOrWhitespace(str: string) {
    if (typeof str === 'undefined' || str === null) return true;
    return str.trim().length < 1;
}

export function sanitizeTextInput(str: string): string {
    const d = document.createElement('div');
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
}

export function humanize(str) {
    return str
        .replace(/^[\s_]+|[\s_]+$/g, '')
        .replace(/[_\s]+/g, ' ')
        .replace(/[a-z][A-Z]/g, function (m) { return `${m[0]} ${m[1].toUpperCase()}`; })
        .replace(/^[a-z]/, function (m) { return m.toUpperCase(); });
}

export function stringFormat(str: string, token: string, newStr: string): string {
    return str.replace(token, newStr);
}

export function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Converts a string to SHA-1 hash
export async function toSHA1(value: string): Promise<string> {
    const uint8Array = new TextEncoder().encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-1', uint8Array);

    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}