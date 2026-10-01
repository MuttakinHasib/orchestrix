import { cn } from "cn";

import { Reveal } from "@/modules/home/components/reveal";
import { ProductFrame } from "@/modules/home/components/product-frame";
import { SectionEyebrow } from "@/modules/home/components/section-eyebrow";
import { PRODUCT_SHOTS } from "@/modules/home/constants/product-shots";

/** Halftone dots that fade out from one corner. */
const HALFTONE =
  "pointer-events-none absolute bg-size-[6px_6px] [background-image:radial-gradient(var(--halftone)_1px,transparent_1.6px)]";

/** The builder, full width, lit cool from the top left and warm from the bottom right. */
export function WorkflowShowcase() {
  return (
    <Reveal>
      <section
        id="workflows"
        aria-labelledby="workflows-heading"
        className="flex scroll-mt-24 flex-col gap-10 lg:gap-14"
      >
        <div className="flex max-w-205 flex-col gap-4.5 lg:pl-6">
          <SectionEyebrow number="02" label="Workflows" />
          <h2
            id="workflows-heading"
            className="text-[2.5rem] leading-none font-medium tracking-[-0.04em] text-balance sm:text-display"
          >
            Build workflows.
            <br />
            Visually.
          </h2>
          <p className="max-w-160 text-lg leading-normal text-pretty text-muted-foreground">
            Connect a trigger to conditions and actions on one canvas. Test each
            step, publish when it’s ready, and every new issue runs through it
            automatically.
          </p>
        </div>

        <div className="relative aspect-[1344/840] lg:-mx-12">
          <div
            aria-hidden
            className={cn(
              HALFTONE,
              "-top-22.5 -left-22.5 h-140 w-190 opacity-55 [--halftone:var(--color-glow-cool)] [mask-image:radial-gradient(closest-side_at_30%_30%,#000,transparent)]",
            )}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-15 -left-15 h-130 w-175 bg-[radial-gradient(closest-side_at_35%_35%,color-mix(in_oklab,var(--color-glow-cool)_55%,transparent),transparent)]"
          />
          <div
            aria-hidden
            className={cn(
              HALFTONE,
              "-right-22.5 -bottom-22.5 h-155 w-180 opacity-50 [--halftone:var(--color-glow-warm)] [mask-image:radial-gradient(closest-side_at_75%_70%,#000,transparent)]",
            )}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-15 -bottom-15 h-140 w-160 bg-[radial-gradient(closest-side_at_70%_70%,color-mix(in_oklab,var(--color-glow-warm)_45%,transparent),transparent)]"
          />
          <div
            aria-hidden
            className="absolute -inset-0.5 rounded-[20px] bg-[linear-gradient(135deg,var(--color-glow-cool-tint)_0%,var(--color-glow-cool)_18%,rgb(255_255_255/0.08)_45%,rgb(255_255_255/0.06)_60%,var(--color-glow-warm)_88%,var(--color-glow-warm-tint)_100%)] shadow-[-10px_-10px_50px_color-mix(in_oklab,var(--color-glow-cool)_45%,transparent),10px_10px_50px_color-mix(in_oklab,var(--color-glow-warm)_35%,transparent)]"
          />
          <ProductFrame
            shot={PRODUCT_SHOTS.workflowBuilder}
            sizes="(min-width: 1440px) 1344px, calc(100vw - 32px)"
            className="absolute inset-0 rounded-[18px] bg-background"
          />
        </div>
      </section>
    </Reveal>
  );
}
