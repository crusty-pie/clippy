function toCommandValue(
    input: string | number | boolean | object | null | undefined,
): string {
    if (input === null || input === undefined) {
        return "";
    } else if (typeof input === "string" || input instanceof String) {
        return input as string;
    }
    return JSON.stringify(input);
}

export function escapeData(
    s: string | number | boolean | object | null | undefined,
): string {
    return toCommandValue(s)
        .replace(/%/g, "%25")
        .replace(/\r/g, "%0D")
        .replace(/\n/g, "%0A");
}

export function escapeProperty(
    s: string | number | boolean | object | null | undefined,
): string {
    return toCommandValue(s)
        .replace(/%/g, "%25")
        .replace(/\r/g, "%0D")
        .replace(/\n/g, "%0A")
        .replace(/:/g, "%3A")
        .replace(/,/g, "%2C");
}
