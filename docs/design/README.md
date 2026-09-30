# Orchestrix Design System — Source Reference

Extracted from the Claude Design project
[`ad831cc0-01f3-4c93-8184-9237247c9da9`](https://claude.ai/design/p/ad831cc0-01f3-4c93-8184-9237247c9da9)
(v2, 2026-09-30). These are the *authored* design files with the canvas runtime
injection stripped; they are the canonical spec for the implementation in
`packages/ui`.

- `orchestrix-design-system-v2.dc.html` — foundations: typography, color,
  space/radius/elevation, icons. Imports the Kit in both modes.
- `orchestrix-kit-v2.dc.html` — component specs (buttons, inputs, menus,
  badges, table, command menu, toasts, overlays, empty/skeleton states).
- `orchestrix-home-and-auth.dc.html` — screens 5.1–5.5: the public home page,
  sign in, sign up, forgot password and onboarding (create workspace). Its
  product shots embed the Work Board and Workflow Builder screens, which stay
  in the Claude Design project until those features are built.

`support.js` (also imported by the design files) is the generic
`dc-runtime` build — a React-UMD bootstrapper that parses `<x-dc>` markup,
expands `<dc-import>` with props, rewrites `<helmet>`, and applies
`style-hover` attributes. It is not project-specific and is not checked in
here.

## Where it is implemented

| Layer | Location |
| ----- | -------- |
| Tokens (both modes, type scale, radius, elevation) | `packages/ui/styles.css` |
| shadcn primitives, themed to the Kit | `packages/ui/src/components/base/<name>/index.tsx` |
| Orchestrix blocks (status, issue status, priority, label chip, actor mark) | `packages/ui/src/components/blocks/<name>/index.tsx` |
| Showcase (the design doc rebuilt as a live page, at `/design-system`) | `apps/web/src/modules/design-system` |
| Home page (5.1) | `apps/web/src/modules/home` |
| Auth and onboarding (5.2–5.5) | `apps/web/src/modules/auth` |
| Brand mark, brand icons, route constants | `apps/web/src/modules/core` |
| Fonts | Geist / Geist Mono via `next/font/local` in `apps/web/src/app/layout.tsx` |

Import pattern: `@repo/ui/components/base/button`,
`@repo/ui/components/blocks/status-badge`, or the `@/components/...` alias
inside `apps/web`. Dark is the default (`<html class="dark">`); the showcase
header toggles light. Adding more shadcn components: `cd packages/ui && pnpm
dlx shadcn@latest add <name>` (they land flat in `src/components/base/` —
folderize with an `index.tsx` to match the convention).

## Token summary

| Group  | Tokens                                                                                                     |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| Fonts  | Geist 400/500/600 (sans), Geist Mono 400/500 (mono, for machine text: keys, IDs, timings)                  |
| Type   | Display 27/1.05 · Title 19/1.15 · Heading 14 · Body 13/1.5 · Small 12 · Data 12 mono · Label 10.5 mono caps |
| Dark   | bg `#0f1013` · panel `#16171b` · sunken `#0b0c0e` · tx `#ecedf0`/`#9b9ea8`/`#6b6e78` · accent `#6368ee`    |
| Light  | bg `#f7f7f9` · panel `#ffffff` · sunken `#eff0f3` · tx `#15161a`/`#5b5e68`/`#8b8e98` · accent `#5a5fe0`    |
| Status | ok `#4fbf8a`/`#25895a` · err `#ef6b5e`/`#cf4436` · warn `#e6b04a`/`#a86f0a` · info `#5ea8e8`/`#2f78c0`    |
| Space  | 4 · 8 · 12 · 16 · 20 · 32 (rows 32–38px, controls 24/30/32px)                                              |
| Radius | tag 2–3 · control 6 · surface 10 · overlay 10 + `shadow-lg`                                                |

Principles: **Indigo is for intent** (the primary button is the only solid
accent fill; focus, selection and automation marks use it as a line).
**Status colors mean status.** Everything else is ink.
