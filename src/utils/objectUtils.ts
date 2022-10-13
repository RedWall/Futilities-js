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