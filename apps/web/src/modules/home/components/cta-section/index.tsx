import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/base/button";
import { ROUTES } from "@/modules/core/constants/routes";

function CtaSection() {
  return (
    <section className="flex flex-col items-center gap-4.5 border-t border-border bg-background px-6 py-28 text-center lg:px-12">
      <h2 className="text-balance text-[32px] font-medium tracking-[-0.03em] sm:text-[44px]">
        Put repetitive work on autopilot
      </h2>
      <p className="text-lg text-muted-foreground">
        Set up your first project and workflow in about ten minutes.
      </p>
      <div className="mt-1.5 flex flex-wrap justify-center gap-2.5">
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
          <Link href={ROUTES.signIn}>Sign in</Link>
        </Button>
      </div>
    </section>
  );
}

export { CtaSection };
