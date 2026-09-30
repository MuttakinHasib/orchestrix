import { BrandMark } from "@/modules/core/components/brand-mark";
import { FOOTER_COLUMNS } from "@/modules/home/constants/footer-columns";

function SiteFooter() {
  return (
    <footer className="grid gap-8 border-t border-border px-6 pt-12 pb-14 text-sm sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:px-24">
      <div className="flex flex-col gap-2.5">
        <span className="flex items-center gap-2.5 text-base font-semibold tracking-tight">
          <BrandMark className="size-3" />
          Orchestrix
        </span>
        <span className="text-muted-foreground/70">
          © 2026 Orchestrix. An educational project.
        </span>
      </div>
      {FOOTER_COLUMNS.map(({ title, links }) => (
        <div key={title} className="flex flex-col gap-2 text-muted-foreground">
          <span className="font-medium text-foreground">{title}</span>
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </div>
      ))}
    </footer>
  );
}

export { SiteFooter };
