const COMBINING_MARKS = /[̀-ͯ]/g;
const NON_ALPHANUMERIC_RUNS = /[^a-z0-9]+/g;
const EDGE_HYPHENS = /^-+|-+$/g;

/** Turns a display name into a URL slug: "Acme Inc." → "acme-inc". */
export function slugify(value: string, maxLength: number): string {
  return value
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .replace(NON_ALPHANUMERIC_RUNS, "-")
    .slice(0, maxLength)
    .replace(EDGE_HYPHENS, "");
}
