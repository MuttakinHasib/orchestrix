import { CircleCheck } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "cn";

import { AccentGlow } from "@/modules/core/components/accent-glow";
import { CtaButtons } from "@/modules/home/components/cta-buttons";
import { ProductFrame } from "@/modules/home/components/product-frame";
import { PRODUCT_SHOTS } from "@/modules/home/constants/product-shots";

const RISE = "relative motion-safe:animate-rise";

/** Staggers the hero's entrance: each line rises a beat after the one above. */
function riseDelay(order: number): CSSProperties {
  return { animationDelay: `${120 + order * 110}ms` };
}

export function Hero() {
  return (
    <section className="relative flex flex-col items-center gap-5.5 overflow-hidden px-4 pt-14 text-center sm:px-6 sm:pt-20 lg:px-12">
      <AccentGlow className="top-65 h-150 w-275 motion-safe:animate-breathe" />

      <p
        className={cn(
          RISE,
          "inline-flex min-h-7 items-center gap-2 rounded-full border border-input px-3 py-1 text-[12.5px] text-muted-foreground",
        )}
        style={riseDelay(0)}
      >
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full bg-primary"
        />
        The workflow engine for engineering teams
      </p>

      <h1
        className={cn(
          RISE,
          "max-w-225 text-[2.5rem] leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-[3.5rem] lg:text-hero",
        )}
        style={riseDelay(1)}
      >
        Manage the work.
        <br />
        Automate the rest.
      </h1>

      <p
        className={cn(
          RISE,
          "max-w-150 text-base text-pretty text-muted-foreground sm:text-lead",
        )}
        style={riseDelay(2)}
      >
        Plan issues, connect GitHub, Slack and your other tools, and let
        workflows handle what happens next. Every run is recorded, step by step.
      </p>

      <div className={cn(RISE, "mt-1.5")} style={riseDelay(3)}>
        <CtaButtons />
      </div>

      <p
        className={cn(
          RISE,
          "flex items-center gap-2 text-[13.5px] text-muted-foreground",
        )}
        style={riseDelay(4)}
      >
        <CircleCheck aria-hidden className="size-3.5 shrink-0 text-success" />
        Free for teams up to 10 · No credit card required
      </p>

      <div className={cn(RISE, "mt-12 w-full max-w-330")} style={riseDelay(5)}>
        <ProductFrame
          shot={PRODUCT_SHOTS.workBoard}
          sizes="(min-width: 1416px) 1320px, calc(100vw - 32px)"
          preload
          className="aspect-[1320/780] rounded-t-[14px] text-left shadow-[0_0_0_1px_var(--input),0_-20px_80px_var(--accent-soft)]"
        />
      </div>
    </section>
  );
}
