import { cn } from "cn";

/**
 * The Orchestrix diamond glyph — an accent outline, never a fill.
 */
function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "size-3.5 shrink-0 rotate-45 rounded-xs border-2 border-primary",
        className,
      )}
    />
  );
}

export { BrandMark };
