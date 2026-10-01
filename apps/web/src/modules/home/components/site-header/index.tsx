import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "cn";

import { Button } from "@repo/ui/components/base/button";

import { BrandMark } from "@/modules/core/components/brand-mark";
import { ROUTES } from "@/modules/core/constants/routes";

import { MobileNav } from "./components/mobile-nav";
import { NAV_LINKS } from "./constants/nav-links";

const NAV_PILL =
  "rounded-[7px] px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";

/** A floating, frosted bar that stays with the reader as they scroll. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-12">
      <div className="mx-auto flex h-14 max-w-336 items-center gap-8 rounded-[14px] border border-input bg-card/60 pr-2.5 pl-4.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] backdrop-blur-md">
        <Link href={ROUTES.HOME} aria-label="Orchestrix home">
          <BrandMark />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-1.5 text-[13.5px]">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className={NAV_PILL}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-8">
          <Link
            href={ROUTES.SIGN_IN}
            className={cn(NAV_PILL, "hidden text-[13.5px] sm:inline")}
          >
            Sign in
          </Link>
          <Button
            asChild
            className="h-9 rounded-[9px] px-3.5 text-[13.5px] motion-safe:transition-[transform,filter] motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]"
          >
            <Link href={ROUTES.SIGN_UP}>
              Start free
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
