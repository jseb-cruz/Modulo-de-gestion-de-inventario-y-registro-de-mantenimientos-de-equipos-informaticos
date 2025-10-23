export function toRecord(meta: Record<string, unknown> | Map<string, unknown> |
    undefined | null)
    : Record<string, unknown> {
    if (!meta) return {};
    return meta instanceof Map ? Object.fromEntries(meta) : meta;
}
export function toMap(meta: Record<string, unknown> | Map<string, unknown> |
    undefined | null)
    : Map<string, unknown> {
    if (!meta) return new Map();
    return meta instanceof Map ? meta : new Map(Object.entries(meta));
}
