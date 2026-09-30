/** Joins element ids for `aria-describedby`, skipping absent ones. */
export function joinIds(
  ...ids: (string | null | undefined)[]
): string | undefined {
  return ids.filter(Boolean).join(" ") || undefined;
}
