import Link from "next/link";
import type { ReactNode } from "react";

import { BrandMark } from "@/modules/core/components/brand-mark";
import { ROUTES } from "@/modules/core/constants/routes";

interface AuthShellProps {
  /** Contextual link or identity shown top-right, e.g. "No account? Sign up". */
  aside: ReactNode;
  children: ReactNode;
}

export function AuthShell({ aside, children }: AuthShellProps) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-secondary text-[13.5px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-60 left-1/2 h-160 w-225 max-w-[200vw] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]"
      />
      <header className="relative flex h-16 items-center justify-between gap-4 px-4 sm:px-10">
        <Link href={ROUTES.HOME} aria-label="Orchestrix home">
          <BrandMark />
        </Link>
        <div className="text-[13px] text-muted-foreground">{aside}</div>
      </header>
      <main className="relative flex flex-1 flex-col items-center justify-center px-4 pt-6 pb-16">
        <div className="flex w-full max-w-100 flex-col items-center gap-6">
          {children}
        </div>
      </main>
    </div>
  );
}
