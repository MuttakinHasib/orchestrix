# AGENTS.md

Guidance for AI agents working in this repository.

This file is the **single source of truth for agent rules** and is read by every harness (OpenCode, Claude Code via `CLAUDE.md`, Cursor via `.cursor/rules/`). Harness-specific files only point here — never duplicate rules into them.

## Agent skills

### Issue tracker

Issues are tracked as local markdown files under `.scratch/<feature>/` in this repo. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context layout: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Rules

Rules live in `docs/rules/` — one file per ruleset. **Read every rule relevant to your change before writing code, and flag violations when reviewing.**

| # | Rule | Scope |
| --- | --- | --- |
| 1 | [Folder structure](docs/rules/folder-structure.md) | Where code goes — modules, use cases, kebab-case folders, locality ladder, delete test |
| 2 | [Design system](docs/rules/design-system.md) | How UI is built — tokens over raw values, base vs blocks, dark-first, mono is for machine text |
| 3 | [Commit conventions](docs/rules/commit-conventions.md) | Git titles — "If merged, this commit will" test, capitalized imperative, no prefixes, no attribution trailers |
| 4 | [`cn()` object notation](docs/rules/cn-object-notation.md) | Conditional classes go in `cn({ 'classes': condition })`, never ternaries or `&&` chains |
| 5 | [No pass-through re-exports](docs/rules/no-pass-through-reexports.md) | No files that only re-export a symbol — update consumers instead; curated `index.ts` barrels are fine |

### Non-negotiables (apply even without opening the rule files)

- Every feature is a module under `apps/<app>/src/modules/<feature>/`; route files are thin shells that mount use cases.
- Kebab-case everywhere; every component/hook/util is a `<name>/index.ts(x)` folder, never a loose file.
- Feature modules import from `modules/core` and `packages/*` only; packages never import from apps.
- UI uses design tokens and `@repo/ui` components — never raw colors; reach for blocks before base primitives.
- Promote code up the locality ladder only when a second consumer appears — never speculatively.

**Adding a ruleset:** create `docs/rules/<name>.md` and add a row to the table above.
