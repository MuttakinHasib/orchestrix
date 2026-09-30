import Link from "next/link";

import { Button } from "@repo/ui/components/base/button";

import { AccentGlow } from "@/modules/core/components/accent-glow";
import { BrandMark } from "@/modules/core/components/brand-mark";
import { ROUTES } from "@/modules/core/constants/routes";

export function ComingSoonPage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-secondary">
      <AccentGlow className="-top-60 h-160 w-225" />
      <header className="relative flex h-16 items-center px-4 sm:px-10">
        <Link href={ROUTES.HOME} aria-label="Orchestrix home">
          <BrandMark />
        </Link>
      </header>
      <main className="relative flex flex-1 flex-col items-center justify-center gap-6 px-4 pb-16 text-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[26px] leading-tight font-medium tracking-[-0.02em] text-balance">
            This page isn’t ready yet
          </h1>
          <p className="max-w-sm text-[13.5px] text-pretty text-muted-foreground">
            We’re still building it. The home page covers what Orchestrix does
            today.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href={ROUTES.HOME}>Back to home</Link>
        </Button>
      </main>
    </div>
  );
}
