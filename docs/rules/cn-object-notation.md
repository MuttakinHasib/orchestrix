# Rule: `cn()` object notation for conditional classes

When class names depend on a boolean, pass them to `cn()` in object form — `cn({ 'some-classes': condition })` — rather than ternaries, string concatenation, or `&&` short-circuits. The object form keeps each condition next to the classes it toggles and merges cleanly with the other arguments.

```tsx
// Prefer
<div
  className={cn('flex items-center gap-2 rounded-md border px-2', {
    'border-destructive text-destructive': hasError,
    'pointer-events-none opacity-45': isDisabled,
  })}
/>
```

```tsx
// Avoid
<div
  className={cn(
    'flex items-center gap-2 rounded-md border px-2',
    hasError && 'border-destructive text-destructive',
    isDisabled ? 'pointer-events-none opacity-45' : '',
  )}
/>
```

Static, unconditional classes stay as plain string arguments — reach for the object form only when a class depends on a boolean.
