import { cn } from "cn";

import { LOOP_STEPS } from "@/modules/home/constants/loop-steps";

function LoopSection() {
  return (
    <section
      aria-label="How Orchestrix works"
      className="grid grid-cols-2 gap-px border-y border-border bg-border md:grid-cols-3 lg:grid-cols-6"
    >
      {LOOP_STEPS.map(({ name, description, icon: Icon, accent }, index) => (
        <div key={name} className="flex flex-col gap-2 bg-background px-6 py-7">
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xs text-muted-foreground/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Icon
              aria-hidden
              className={cn("size-4 text-muted-foreground", {
                "text-primary": accent,
              })}
            />
          </div>
          <span className="font-medium">{name}</span>
          <span className="text-pretty text-muted-foreground">
            {description}
          </span>
        </div>
      ))}
    </section>
  );
}

export { LoopSection };
