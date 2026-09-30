import Link from "next/link";

import { Button } from "@/components/base/button";
import { BrandMark } from "@/modules/core/components/brand-mark";
import { ROUTES } from "@/modules/core/constants/routes";
import { NAV_LINKS } from "@/modules/home/constants/nav-links";

function SiteHeader() {
  return (
    <header className="flex h-16 items-center gap-8 border-b border-border bg-secondary px-6 lg:px-12">
      <Link
        href={ROUTES.home}
        className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-foreground hover:text-foreground"
      >
        <BrandMark />
        Orchestrix
      </Link>
      <nav aria-label="Primary" className="hidden gap-6.5 md:flex">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {label}
          </a>
        ))}
      </nav>
      <span className="flex-1" />
      <Link
        href={ROUTES.signIn}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        Sign in
      </Link>
      <Button asChild size="lg" className="h-[34px]">
        <Link href={ROUTES.signUp}>Start free</Link>
      </Button>
    </header>
  );
}

export { SiteHeader };
