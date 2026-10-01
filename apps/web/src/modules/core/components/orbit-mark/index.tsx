import { useId } from "react";

interface OrbitMarkProps {
  /** Size, e.g. `size-4.5`. */
  className?: string;
}

/**
 * The Orchestrix "Orbit" mark: an O with an event travelling around it. The
 * gap around the event is a mask rather than a background-filled circle, so
 * the mark sits on any surface.
 */
export function OrbitMark({ className }: OrbitMarkProps) {
  const maskId = useId();

  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className}>
      <mask id={maskId}>
        <rect width="48" height="48" fill="white" />
        <circle cx="34.25" cy="13.75" r="6.5" fill="black" />
      </mask>
      <circle
        cx="24"
        cy="24"
        r="14.5"
        stroke="currentColor"
        strokeWidth="4.5"
        mask={`url(#${maskId})`}
      />
      <circle cx="34.25" cy="13.75" r="4.5" className="fill-primary" />
    </svg>
  );
}
