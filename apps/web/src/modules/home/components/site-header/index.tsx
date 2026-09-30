import Link from "next/link";

import { Button } from "@repo/ui/components/base/button";

import { BrandMark } from "@/modules/core/components/brand-mark";
import { ROUTES } from "@/modules/core/constants/routes";

import { MobileNav } from "./components/mobile-nav";
import { NAV_LINKS } from "./constants/nav-links";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-8 px-4 sm:px-6 lg:px-12">
        <Link href={ROUTES.HOME} aria-label="Orchestrix home">
          <BrandMark />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-6.5 text-[13.5px]">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4 md:gap-8">
          <Link
            href={ROUTES.SIGN_IN}
            className="hidden text-[13.5px] text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Sign in
          </Link>
          <Button
            asChild
            className="h-[34px] rounded-[7px] px-3.5 text-[13.5px]"
          >
            <Link href={ROUTES.SIGN_UP}>Start free</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
