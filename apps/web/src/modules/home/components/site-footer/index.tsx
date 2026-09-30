import Link from "next/link";

import { BrandMark } from "@/modules/core/components/brand-mark";

import { FOOTER_COLUMNS } from "./constants/footer-columns";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-8 gap-y-10 px-4 pt-12 pb-14 text-[13px] sm:px-6 md:grid-cols-[1.4fr_repeat(4,1fr)] lg:px-12 xl:px-24">
        <div className="col-span-2 flex flex-col gap-2.5 md:col-span-1">
          <BrandMark size="sm" />
          <p className="text-muted-foreground/70">
            © {new Date().getFullYear()} Orchestrix. An educational project.
          </p>
        </div>

        {FOOTER_COLUMNS.map(({ title, links }) => (
          <nav
            key={title}
            aria-labelledby={`footer-${title}`}
            className="flex flex-col gap-2"
          >
            <h2 id={`footer-${title}`} className="font-medium text-foreground">
              {title}
            </h2>
            <ul className="flex flex-col gap-2">
              {links.map(({ label, href }) => (
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
        ))}
      </div>
    </footer>
  );
}
