import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@repo/ui/components/base/button";

import { ROUTES } from "@/modules/core/constants/routes";
import { env } from "@/modules/core/env";

export function ClosingCta() {
  return (
    <section className="flex flex-col items-center gap-4.5 border-t border-border bg-background px-4 py-20 text-center sm:px-6 sm:py-28">
      <h2 className="text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] text-balance sm:text-headline">
        Put repetitive work on autopilot
      </h2>
      <p className="text-base text-pretty text-muted-foreground sm:text-lg sm:leading-normal">
        Set up your first project and workflow in about ten minutes.
      </p>
      <div className="mt-1.5 flex flex-wrap justify-center gap-2.5">
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
          className="h-10.5 bg-transparent px-4.5 text-sm"
        >
          <Link href={env.docsUrl}>Read the docs</Link>
        </Button>
      </div>
    </section>
  );
}
