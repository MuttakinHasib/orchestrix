import Link from "next/link";

import { BrandMark } from "@/modules/core/components/brand-mark";
import { ROUTES } from "@/modules/core/constants/routes";

/**
 * Centered single-column frame shared by every auth screen. `aside` fills the
 * top-right corner (usually a link to the sibling screen).
 */
function AuthShell({
  aside,
  children,
}: {
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-secondary">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-60 left-1/2 h-[640px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]"
      />
      <header className="relative flex h-16 w-full items-center justify-between px-6 lg:px-10">
        <Link
          href={ROUTES.home}
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-foreground hover:text-foreground"
        >
          <BrandMark />
          Orchestrix
        </Link>
        <div className="text-sm text-muted-foreground">{aside}</div>
      </header>
      <main className="relative flex w-full max-w-[448px] flex-1 flex-col justify-center gap-6 px-6 pb-16">
        {children}
      </main>
    </div>
  );
}

export { AuthShell };
