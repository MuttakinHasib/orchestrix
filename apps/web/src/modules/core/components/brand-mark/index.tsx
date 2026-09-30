import { cn } from "cn";

const BRAND_MARK_SIZE = {
  sm: { mark: "size-3", text: "text-[15px]" },
  md: { mark: "size-3.5", text: "text-base" },
} as const;

type BrandMarkSize = keyof typeof BRAND_MARK_SIZE;

interface BrandMarkProps {
  size?: BrandMarkSize;
  className?: string;
}

/** The Orchestrix diamond and wordmark. Wrap it in a link where it navigates. */
export function BrandMark({ size = "md", className }: BrandMarkProps) {
  const { mark, text } = BRAND_MARK_SIZE[size];

  return (
    <span
      translate="no"
      className={cn(
        "inline-flex items-center gap-2.5 font-semibold tracking-[-0.01em] text-foreground",
        text,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("rotate-45 rounded-xs border-2 border-primary", mark)}
      />
      Orchestrix
    </span>
  );
}
