/**
 * Creates a deep copy using the `structuredClone` browser API, or falls back on the JSON conversion technique if
 * the browser API is unavailable.
 * https://developer.mozilla.org/en-US/docs/Web/API/structuredClone#browser_compatibility
 *
 * @param {T} source - The reference type to create a deep copy of.
 * @returns A deep copy of the source.
 */
export function deepCopy<T>(source: T): T {
    try {
        return 'structuredClone' in window ? (window as any).structuredClone(source) : JSON.parse(JSON.stringify(source));
    } catch (ex) {
        return JSON.parse(JSON.stringify(source));
    }
}

/**
 * Creates a deep copy using the JSON conversion technique with a replacer function.
 *
 * @param {T} source - The reference type to create a deep copy of.
 * @param {(this: any, key: string, value: any) => any} replacer - The replacer function to use during the JSON conversion.
 * @returns A deep copy of the source.
 */
export function deepCopyWithReplacer<T>(source: T, replacer: (this: any, key: string, value: any) => any): T {
    return JSON.parse(JSON.stringify(source, replacer))
}

/**
 * Returns a new array with any duplicate items with a specified key removed.
 *
 * @param {T} array - The array to remove duplicates from.
 * @param {string} key - The key to use to determine uniqueness.
 * @returns A new array with duplicates removed.
 */
export function getDistinctItems<T>(array: T[], key: keyof T): T[] {
    return array.reduce((acc, item) => {
        if (!acc.includes(item[key])) {
            acc.push(item[key]);
        }
        return acc;
    }, []);
}