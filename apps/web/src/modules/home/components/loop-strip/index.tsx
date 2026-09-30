import { cn } from "cn";

import { LOOP_STEPS } from "./constants/loop-steps";

/** The product loop, in order: each step feeds the next. */
export function LoopStrip() {
  return (
    <section
      id="product"
      aria-labelledby="product-heading"
      className="border-y border-border"
    >
      <h2 id="product-heading" className="sr-only">
        How Orchestrix works
      </h2>
      <ol className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-6">
        {LOOP_STEPS.map(
          ({ name, description, icon: Icon, isAutomation }, index) => (
            <li
              key={name}
              className="flex flex-col gap-2 bg-background px-6 py-7"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-muted-foreground/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon
                  aria-hidden
                  className={cn("size-3.75 text-muted-foreground", {
                    "text-primary": isAutomation,
                  })}
                />
              </div>
              <h3 className="text-base font-medium">{name}</h3>
              <p className="text-[13px] text-pretty text-muted-foreground">
                {description}
              </p>
            </li>
          ),
        )}
      </ol>
    </section>
  );
}
