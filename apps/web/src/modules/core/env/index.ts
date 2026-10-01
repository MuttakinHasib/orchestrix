const DEFAULT_DOCS_URL = "http://localhost:3001";

/** Public runtime config. `NEXT_PUBLIC_*` values are inlined at build time. */
export const env = {
  docsUrl: process.env.NEXT_PUBLIC_DOCS_URL ?? DEFAULT_DOCS_URL,
} as const;
