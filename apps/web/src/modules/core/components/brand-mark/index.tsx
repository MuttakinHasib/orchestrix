import { cn } from "cn";

import { OrbitMark } from "@/modules/core/components/orbit-mark";

const BRAND_MARK_SIZE = {
  sm: { mark: "size-4", text: "text-[15px]" },
  md: { mark: "size-4.5", text: "text-base" },
} as const;

type BrandMarkSize = keyof typeof BRAND_MARK_SIZE;

interface BrandMarkProps {
  size?: BrandMarkSize;
  className?: string;
}

/** The Orbit mark with the Orchestrix wordmark. Wrap it in a link where it navigates. */
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
      <OrbitMark className={mark} />
      Orchestrix
    </span>
  );
}
