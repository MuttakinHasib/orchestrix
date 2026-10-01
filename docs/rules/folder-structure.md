# Rule: Folder structure

A module-based architecture that keeps a React codebase predictable, feature-isolated, and delete-safe. Every rule serves one property — **the delete test**:

> You can delete a feature module's folder and the rest of the codebase keeps compiling — or breaks only in the obvious, co-located route file that mounted it.

When placing any new code, follow the decision rules below. When reviewing code, flag violations of them.

## 1. Core principles

1. **Every feature is a module.** A module owns its own components, hooks, contexts, constants, types, schemas, stores, and utils. If the feature dies, the module folder dies with it.
2. **Every page is a "use case" of a module.** One module can be mounted on multiple pages; each mounting point is a use case that composes the module's shared internals.
3. **Cross-cutting code lives in `core`.** Feature modules may import from `core`; `core` never imports from feature modules.
4. **Cross-app code lives in `packages/*`** (monorepos only). Apps compose packages; packages never import from apps.
5. **Kebab-case everywhere.** Every file and folder, no exceptions.
6. **Group by kind, then by locality.** `components/`, `hooks/`, `contexts/`, `constants/`, `types/`, `utils/` are the canonical category folders at every depth. Higher in the tree = more shared; deeper = more local.
7. **Localize first, promote on proven reuse.** Code starts as deep as possible and only moves up when a second consumer appears.

## 2. Top-level layout (monorepo)

```text
<repo>/
├── apps/                    # Deployable applications — compose modules + packages
│   ├── <app>/               # e.g. web, docs, storybook (component docs for packages/ui)
│   └── …
└── packages/                # Reusable, app-agnostic workspace packages
    ├── ui/                  # Design system — base primitives + blocks (see §8)
    ├── configs/             # Shared eslint-config, typescript-config
    ├── constants/           # Cross-app constants (routes, keys, enums)
    ├── contexts/            # Cross-app React contexts
    ├── hooks/               # Cross-app hooks
    ├── icons/               # Icon components, one folder per icon
    ├── libs/                # Small shared libraries (auth, error logging, …)
    ├── schemas/             # Cross-app validation schemas — single source of truth for payload shapes
    ├── services/            # API service clients, one package per backend domain
    ├── shared-core/         # Core-shaped code shared by multiple apps (see §8)
    ├── types/               # Cross-app TypeScript types
    └── utils/               # Cross-app pure utilities
```

Hard rules at this level:

- **`apps/*` depends on `packages/*` — never the other way around.**
- **Packages depend on packages only when the dependency is generic.** `packages/ui` must not import `packages/services`. A package importing "sideways" for domain reasons is a signal the code belongs in a module, not a package.
- Workspace packages are imported via a stable alias (e.g. `@repo/<package>`), with granular per-symbol export paths for tree-shaking.

For a single-app repo, drop the `apps/`/`packages/` split and keep everything from §3 onward under `src/`.

## 3. The module system — `apps/<app>/src/modules/`

Every feature lives under `apps/<app>/src/modules/<feature>/`. The app's `src/` contains only `app/` (routes), `modules/`, and app-level plumbing (e.g. `middleware.ts`).

### 3.1 Canonical module shape

```text
apps/<app>/src/modules/<feature>/
├── components/        # Components reusable across this module
├── constants/         # Constants private to this module
├── contexts/          # React contexts private to this module
├── hooks/             # Hooks private to this module
├── layouts/           # Layout wrappers private to this module
├── providers/         # Top-level provider wrappers used by this module
├── schemas/           # Validation schemas private to this module
├── services/          # API calls private to this module
├── stores/            # State stores (e.g. Zustand) private to this module
├── types/             # Types private to this module
├── utils/             # Pure utilities private to this module
├── modules/           # Sub-modules, when the feature is large enough to split (§3.4)
├── usecases/          # Page-level entry points — one folder per page (§4)
└── index.tsx          # Optional module entry point (for single-mount modules)
```

A module contains **only the folders it actually needs**. A small module might be `components/` + `index.tsx`; a large one uses nearly all of them. Always use the plural, kebab-case folder names above — never `store/`, `context/`, `Components/`.

### 3.2 The `core` module

`modules/core/` holds the app's global surface area — everything cross-cutting that isn't a feature:

```text
apps/<app>/src/modules/core/
├── components/        # Cross-cutting components used by many modules
├── constants/         # App-wide constants (routes, query keys, analytics events, …)
├── contexts/          # App-wide contexts (socket, user, organization, …)
├── env/               # Type-safe runtime env config
├── hooks/             # Global hooks (auth, analytics, query hooks, …)
├── layouts/           # App shells (sidebar, topbar, app frame)
├── lib/               # First-party libraries (event-bus, analytics, auth, …)
├── schemas/           # App-wide schemas
├── services/          # App-wide service clients
├── stores/            # App-wide stores
├── types/             # App-wide types
└── utils/             # App-wide pure utilities
```

`core` is deliberately isolated: feature modules consume it, it consumes no feature module. Global hooks and services never live inside a feature module — that separation is what makes feature modules deletable in one shot.

### 3.3 Import rules between modules

- A feature module may import from **`modules/core`** and **`packages/*`** only.
- A feature module **must never reach into another feature module's internals.**
- If two feature modules need to share something, that something graduates into `core` (or a package if it's app-agnostic). The graduation is the fix — never the cross-import.

### 3.4 Sub-modules

When a feature grows large enough to have distinct areas, split it with a nested `modules/` folder — e.g. `workflows/modules/workflow-list/`, `workflows/modules/workflow-builder/`, `workflows/modules/executions/`. Each sub-module follows the same canonical shape as a module. Sub-modules may use the parent module's shared folders; siblings don't reach into each other (same rule as §3.3, one level down).

## 4. Use cases — one module, many pages

A **use case** is a single page-level export of a module, under `usecases/<page-name>/`:

```text
apps/web/src/modules/issues/
├── components/            # Shared across all use cases (issue-row, issue-peek, …)
├── hooks/
└── usecases/
    ├── issues-page/       # Mounted at /issues
    ├── board-page/        # Mounted at /board
    └── labels-page/       # Mounted at /settings/labels
```

Rules:

- Each use case is a folder with an `index.tsx` (plus its own nested `components/` etc. per §5) that composes the module's shared components, hooks, and providers. Use cases never duplicate module internals.
- If a feature appears in two places (e.g. a standalone issues page and a project-scoped issues tab), that is **one module with two use cases** — not two components in two places.
- A module mounted on exactly one page may use a top-level `index.tsx` instead of a `usecases/` folder; introduce `usecases/` the moment a second mounting point appears.

### Route files are thin shells

The framework's routing tree (e.g. Next.js `app/`) answers *where* a page is mounted; `modules/*/usecases/*` answers *what* the page is. Route files are one-liners that mount a use case:

```tsx
// apps/web/src/app/(app-layout)/workflows/page.tsx
import { WorkflowListPage } from '@/modules/workflows/usecases/workflow-list-page';

const Page = () => <WorkflowListPage />;

export default Page;
```

Route groups (`(app-layout)`, `(marketing-pages)`, …) exist purely to wire layouts. No feature logic ever lives in the routing tree — at most route-local metadata co-located next to the `page.tsx`.

## 5. Grouping rules — nested category folders

Inside any folder, children are grouped by kind into category folders, recursively, at every depth:

- A component's private sub-components go in a sibling `components/` folder — even when there is exactly one, and even several levels deep.
- A component's private hook goes in a sibling `hooks/` folder; a private context in `contexts/`; private constants in `constants/`; and so on for `types/` and `utils/`.
- Every component, hook, context, util, and constant is a **folder with an `index.ts(x)`** — never a loose sibling file (`issue-row/index.tsx`, not `IssueRow.tsx` next to its parent).

A real nested example:

```text
components/board-toolbar/
├── index.tsx
└── components/
    └── issue-filter-menu/
        ├── index.tsx
        ├── contexts/
        │   ├── filter-state-context/
        │   └── filter-menu-open-context/
        └── hooks/
            └── use-priority-filter/
```

The tree is the documentation. Reading it top to bottom tells you what's shared (top-level category folders) and what's strictly local (nested category folders) without opening a single file.

## 6. Naming convention — kebab-case only

**Every file and folder is kebab-cased.** No exceptions for:

- Component files: `issue-row/index.tsx`, never `IssueRow.tsx`
- Hooks: `use-issue-filters/index.ts`, never `useIssueFilters.ts`
- Contexts, providers, stores, utils, types, tests, stories — everything.

Exported symbols keep their language-level casing (`IssueRow` component, `useIssueFilters` hook); only the filesystem is kebab-case.

This rule is load-bearing, not cosmetic: macOS filesystems are case-insensitive but case-preserving, while Linux and CI are case-sensitive. Casing-only renames silently pass locally, break CI, and create unresolvable merge conflicts. A single lowercase canonical form removes the entire failure class.

## 7. Locality-first promotion

All code starts as local as possible and moves up **only when a second consumer appears**:

| Scope | Location |
| --- | --- |
| Used by one component | That component's nested `components/` / `hooks/` / `utils/` |
| Used by two siblings | One level up, in the shared parent's category folder |
| Used across one module | The module's top-level category folder |
| Used by multiple modules | `modules/core/<kind>/` |
| Used by multiple apps | `packages/<kind>/src/` (or `packages/shared-core`) |

The same ladder applies to constants, types, schemas, hooks, and utils alike. Promotion is the **only** refactor ever needed — the thing being shared moves up one level, and nothing else has to move. Never promote speculatively ("might be reused someday"); wait for the second consumer.

## 8. The `packages/*` layer (monorepo)

Each package follows the same internal shape as a module: grouped by kind, then one kebab-case folder per symbol.

- **`packages/services/`** — one package per backend domain (`auth-service`, `issues-service`, …). API clients + response validation at the boundary.
- **`packages/schemas/`, `packages/types/`, `packages/constants/`** — the cross-app contract layer. A schema/type/constant belongs here only once more than one app uses it (§7).
- **`packages/shared-core/`** — when multiple apps grow near-identical `modules/core` code, it graduates here. Mirrors the core shape (`components/`, `contexts/`, `hooks/`, `stores/`, `schemas/`, `lib/`, `types/`, `utils/`).
- **`packages/ui/`** — the design system, split in two layers:

  ```text
  packages/ui/src/components/
  ├── base/      # Primitives: button, input, dialog, select, tooltip, …
  │              # Thin wrappers over headless primitives + cn() + design tokens.
  └── blocks/    # Opinionated compositions: status-badge, issue-status,
                 # priority, label-chip, actor-mark, …
  ```

  `base/` components are always composable; `blocks/` are batteries-included patterns. Feature code reaches for a block first and drops to base primitives only when it needs something custom. Feature-specific components never live in `packages/ui` — they belong in the feature's own module.

## 9. Placement decision procedure

When creating any new file, answer in order:

1. **What kind is it?** → picks the category folder name (`components/`, `hooks/`, `contexts/`, `constants/`, `types/`, `utils/`, `schemas/`, `stores/`, `services/`).
2. **Who consumes it today?** → picks the depth via the §7 ladder. One consumer → nest it next to that consumer.
3. **Is it a page?** → it's a use case: `modules/<feature>/usecases/<page-name>/`, plus a thin route file that mounts it.
4. **Is it a new feature?** → new module folder `modules/<feature>/` with only the category folders it needs.
5. **Name it kebab-case, as a folder with `index.ts(x)`.**

And when deleting a feature, verify the delete test holds:

```bash
rm -rf apps/<app>/src/modules/<feature>
# plus the route file(s) that mounted its use cases
```

If anything else breaks, something leaked out of the module — fix the leak (promote it properly or delete the dangling import), don't restore the coupling.

## 10. Review checklist

Flag any of these in review:

- [ ] A file or folder that isn't kebab-case.
- [ ] A component/hook/util as a loose file instead of a `<name>/index.ts(x)` folder.
- [ ] A feature module importing another feature module's internals.
- [ ] `core` (or `shared-core`) importing from a feature module.
- [ ] A package importing from an app, or a generic package importing a domain package.
- [ ] Feature logic inside the routing tree instead of a use case.
- [ ] Code placed globally (core/package) with only one consumer.
- [ ] Code duplicated in two modules instead of being promoted to the shared level.
- [ ] Singular or off-convention category folders (`store/`, `context/`, `helper/`).
