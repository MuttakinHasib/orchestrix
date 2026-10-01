import { cn } from "cn";

interface AccentGlowProps {
  /** Position and size, e.g. `-top-60 h-160 w-225`. */
  className?: string;
}

/** The soft indigo glow behind hero and auth content. Decorative only. */
export function AccentGlow({ className }: AccentGlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 max-w-[200vw] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]",
        className,
      )}
    />
  );
}
