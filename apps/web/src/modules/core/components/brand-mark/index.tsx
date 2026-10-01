import { useId } from "react";

import { cn } from "cn";

const BRAND_MARK_SIZE = {
  sm: { mark: "size-4", text: "text-[15px]" },
  md: { mark: "size-4.5", text: "text-base" },
} as const;

type BrandMarkSize = keyof typeof BRAND_MARK_SIZE;

interface BrandMarkProps {
  size?: BrandMarkSize;
  className?: string;
}

/**
 * The Orchestrix "Orbit" mark and wordmark: an O with an event travelling
 * around it. The gap around the event is a mask rather than a background-filled
 * circle, so the mark sits on any surface. Wrap it in a link where it navigates.
 */
export function BrandMark({ size = "md", className }: BrandMarkProps) {
  const { mark, text } = BRAND_MARK_SIZE[size];
  const maskId = useId();

  return (
    <span
      translate="no"
      className={cn(
        "inline-flex items-center gap-2.5 font-semibold tracking-[-0.01em] text-foreground",
        text,
        className,
      )}
    >
      <svg viewBox="0 0 48 48" fill="none" aria-hidden className={mark}>
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
      Orchestrix
    </span>
  );
}
