import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@repo/ui/components/base/button";

import { AccentGlow } from "@/modules/core/components/accent-glow";
import { ROUTES } from "@/modules/core/constants/routes";
import { ProductFrame } from "@/modules/home/components/product-frame";
import { PRODUCT_SHOTS } from "@/modules/home/constants/product-shots";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center gap-5.5 overflow-hidden px-4 pt-16 text-center sm:px-6 sm:pt-24 lg:px-12">
      <AccentGlow className="top-65 h-150 w-275" />

      <p className="relative inline-flex min-h-7 items-center gap-2 rounded-full border border-input px-3 py-1 text-[12.5px] text-muted-foreground">
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full bg-primary"
        />
        New: retry failed steps from the execution view
      </p>

      <h1 className="relative max-w-225 text-[2.5rem] leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-[3.5rem] lg:text-hero">
        Manage the work.
        <br />
        Automate the rest.
      </h1>

      <p className="relative max-w-150 text-base text-pretty text-muted-foreground sm:text-lead">
        Orchestrix is where engineering teams plan issues, build workflows that
        run on every change, and see exactly what each automation did.
      </p>

      <div className="relative mt-1.5 flex flex-wrap justify-center gap-2.5">
        <Button asChild size="xl" className="h-10.5 px-4.5 text-sm">
          <Link href={ROUTES.SIGN_UP}>
            Start free
            <ArrowRight aria-hidden />
          </Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          size="xl"
          className="h-10.5 px-4.5 text-sm"
        >
          <Link href={ROUTES.COMING_SOON}>Book a demo</Link>
        </Button>
      </div>

      <p className="relative text-[12.5px] text-muted-foreground/70">
        Free for teams up to 10 · No credit card
      </p>

      <ProductFrame
        shot={PRODUCT_SHOTS.workBoard}
        sizes="(min-width: 1276px) 1180px, calc(100vw - 32px)"
        preload
        className="relative mt-10 w-full max-w-295 rounded-t-[14px] text-left shadow-[0_0_0_1px_var(--input),0_-20px_80px_var(--accent-soft)]"
      />
    </section>
  );
}
