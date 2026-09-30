# Rule: Design system

How UI is built in Orchestrix. Source of truth for tokens and visual spec: `docs/design/` (extracted from the Claude Design project).

## 1. Tokens, never raw values

- All colors, radii, shadows, and type sizes come from the token set in `packages/ui/styles.css`. Use Tailwind semantic utilities (`bg-background`, `text-muted-foreground`, `border-input`, `text-success`) — **never raw colors** (`bg-blue-500`, `text-[#6368ee]`).
- **Indigo is for intent.** The primary button is the only solid accent fill on a screen; focus, selection, and automation marks use it as a line.
- **Status colors mean status.** `success` / `destructive` / `warning` / `info` (+ `-soft` tints) appear only on execution states, validation, and alerts.
- Everything else is ink: three text weights (400/500/600) and two hairlines (`border`, `input`) carry hierarchy.
- No manual `dark:` color overrides. Both modes are token-driven; `<html class="dark">` is the default. If a component looks wrong in light mode, the token mapping is wrong — fix it there.

## 2. Importing components

- Import via the workspace alias with granular paths: `@repo/ui/components/base/button`, `@repo/ui/components/blocks/status-badge`.
- **Reach for a block first** (`status-badge`, `issue-status`, `priority`, `label-chip`, `actor-mark`); drop to `base/` primitives only when you need something custom.
- Feature-specific components never live in `packages/ui` — they belong to the feature's module.

## 3. Typography and data

- Geist for everything people write and read; **Geist Mono only for what the system generates** — keys, IDs, timings, table figures, keyboard hints. `font-mono`, never for prose.
- Table headers are mono caps (`10.5px`, `0.08em` tracking); rows are `38px`.

## 4. Composition conventions

- Forms use `Field` + `FieldGroup` — never raw `div` layout. Validation: `data-invalid` on the field, `aria-invalid` on the control.
- Spacing: `gap-*`, never `space-*`. Equal dimensions: `size-*`. Icons inside components auto-size — no manual `size-4` on lucide icons.
- Every interactive surface implements **all UI states**: loading, empty, error, disabled, permission denied — happy-path-only UI is a bug (see `docs/project_overview.md` §54).
- Adding shadcn components: `cd packages/ui && pnpm dlx shadcn@latest add <name>` — they land flat in `src/components/base/`; folderize as `<name>/index.tsx` to match the convention.
