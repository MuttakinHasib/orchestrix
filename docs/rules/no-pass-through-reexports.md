# Rule: No pass-through re-export files

A pass-through re-export is any file whose entire job is to re-export a symbol from another module. There are two ways such a file appears — both are wrong:

1. **Creating one on purpose.** Writing a new file solely so a symbol is reachable from a second import path (e.g. a local file whose whole body is `export { foo } from '<real location>'`).
2. **Leaving one behind during a refactor.** When moving or renaming a symbol, replacing the original file with `export { foo } from '<new location>'` to keep existing imports working — instead of updating every consumer to the new path.

```ts
// Avoid — a file at the old (or wrapping) location whose entire body is:
export { useExecutionFilters } from '@/modules/issues/hooks/use-execution-filters';

// Prefer — every consumer imports from the real location:
import { useExecutionFilters } from '@/modules/issues/hooks/use-execution-filters';
```

## During a refactor

When refactoring, the correct response to "but this will break N call sites" is to update those N call sites in the same change, not to add a shim. Pass-through files obscure where a symbol actually lives, accumulate as dead aliases over time, and inflate the import graph.

## Scope

This applies everywhere in the repo — apps, packages, anywhere — not just one app or module tree. It also applies when porting code between apps: if the source file imported through a shim, switch to the real location in the destination rather than mirroring the shim.

## Allowed exception

A deliberately curated `index.ts` that aggregates several sibling exports into one public surface (e.g. `packages/ui/src/components/base/button/index.tsx`) is fine. This rule targets files that exist purely as a single redirection.
