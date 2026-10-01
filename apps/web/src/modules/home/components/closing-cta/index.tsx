import { CtaButtons } from "@/modules/home/components/cta-buttons";

export function ClosingCta() {
  return (
    <section className="flex flex-col items-center gap-4.5 border-t border-border bg-background px-4 py-20 text-center sm:px-6 sm:py-28">
      <h2 className="text-[2.25rem] leading-[1.05] font-medium tracking-[-0.04em] text-balance sm:text-display-sm">
        Put repetitive work on autopilot.
      </h2>
      <p className="text-lg leading-normal text-pretty text-muted-foreground">
        Set up your first project and workflow in about ten minutes.
      </p>
      <div className="mt-1.5">
        <CtaButtons isDocsOutlined />
      </div>
    </section>
  );
}
