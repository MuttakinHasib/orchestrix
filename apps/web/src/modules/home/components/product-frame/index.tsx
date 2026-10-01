import Image from "next/image";
import { cn } from "cn";

import type { ProductShot } from "@/modules/home/constants/product-shots";

/** Screenshots carry small UI text, so they are served above the default quality. */
const SCREENSHOT_QUALITY = 95;

interface ProductFrameProps {
  shot: ProductShot;
  /** Responsive `sizes` hint for the image, matching the frame's rendered width. */
  sizes: string;
  preload?: boolean;
  /** Frame chrome and size. A fixed aspect ratio crops the shot from the top. */
  className?: string;
}

/** A framed product screenshot that follows the active theme. */
export function ProductFrame({
  shot,
  sizes,
  preload = false,
  className,
}: ProductFrameProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <Image
        src={shot.dark}
        alt={shot.alt}
        sizes={sizes}
        quality={SCREENSHOT_QUALITY}
        preload={preload}
        placeholder="blur"
        className="hidden h-auto w-full dark:block"
      />
      <Image
        src={shot.light}
        alt={shot.alt}
        sizes={sizes}
        quality={SCREENSHOT_QUALITY}
        placeholder="blur"
        className="h-auto w-full dark:hidden"
      />
    </div>
  );
}
