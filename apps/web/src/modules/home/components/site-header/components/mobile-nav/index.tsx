"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@repo/ui/components/base/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/base/sheet";

import { BrandMark } from "@/modules/core/components/brand-mark";
import { ROUTES } from "@/modules/core/constants/routes";

import { NAV_LINKS } from "../../constants/nav-links";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 lg:hidden"
          aria-label="Open menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        aria-describedby={undefined}
        className="w-full max-w-xs overscroll-contain p-0"
      >
        <SheetHeader className="h-16 justify-center border-b border-border px-5">
          <SheetTitle>
            <BrandMark />
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Main" className="px-2 py-3">
          <ul className="flex flex-col">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <SheetClose asChild>
                  <Link
                    href={href}
                    className="flex h-11 items-center rounded-md px-3 text-[15px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <SheetFooter className="border-t border-border p-5">
          <Button asChild variant="secondary" size="xl">
            <Link href={ROUTES.SIGN_IN}>Sign in</Link>
          </Button>
          <Button asChild size="xl">
            <Link href={ROUTES.SIGN_UP}>Start free</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
