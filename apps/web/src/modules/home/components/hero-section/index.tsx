import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/base/button";
import { ROUTES } from "@/modules/core/constants/routes";

import { BoardPreview } from "./components/board-preview";

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center gap-5.5 overflow-hidden px-6 pt-24 text-center lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute top-65 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]"
      />
      <span className="relative inline-flex h-7 items-center gap-2 rounded-full border border-input px-3 text-xs text-muted-foreground">
        <span aria-hidden className="size-1.5 rounded-full bg-primary" />
        New: retry failed steps from the execution view
      </span>
      <h1 className="relative max-w-[900px] text-balance text-[44px] leading-none font-medium tracking-[-0.035em] sm:text-[56px] lg:text-[68px] lg:leading-[1.02]">
        Manage the work.
        <br />
        Automate the rest.
      </h1>
      <p className="relative max-w-[600px] text-pretty text-lg text-muted-foreground">
        Orchestrix is where engineering teams plan issues, build workflows that
        run on every change, and see exactly what each automation did.
      </p>
      <div className="relative mt-1.5 flex flex-wrap justify-center gap-2.5">
        <Button asChild className="h-[42px] gap-2 px-4.5 text-base">
          <Link href={ROUTES.signUp}>
            Start free
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          className="h-[42px] px-4.5 text-base"
        >
          <a href="#">Book a demo</a>
        </Button>
      </div>
      <span className="relative text-xs text-muted-foreground/70">
        Free for teams up to 10 · No credit card
      </span>
      <BoardPreview />
    </section>
  );
}

export { HeroSection };
