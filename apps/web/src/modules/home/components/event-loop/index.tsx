"use client";

import { useEffect, useState } from "react";
import { cn } from "cn";

import { Reveal } from "@/modules/home/components/reveal";

import { FlowArrow } from "./components/flow-arrow";
import { EVENT_LOOP_STEPS } from "./constants/event-loop-steps";

const CYCLE_MS = 2200;

/**
 * Event → Workflow → Action → Result. The highlight walks the loop on its own
 * until the reader points at, focuses or clicks a step; then it stays put.
 */
export function EventLoop() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    if (
      isPinned ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % EVENT_LOOP_STEPS.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(timer);
  }, [isPinned]);

  const pick = (index: number) => {
    setIsPinned(true);
    setActiveIndex(index);
  };

  return (
    <section
      id="product"
      aria-labelledby="product-heading"
      className="scroll-mt-24 border-y border-border bg-secondary px-4 py-16 sm:px-6 sm:py-22 lg:px-12 xl:px-24"
    >
      <div className="mx-auto flex max-w-312 flex-col items-center gap-9">
        <div className="flex flex-col items-center gap-2.5 text-center">
          <h2
            id="product-heading"
            className="text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] text-balance sm:text-section"
          >
            Everything starts with an event.
          </h2>
          <p className="max-w-140 text-lg leading-normal text-pretty text-muted-foreground">
            Something happens to an issue. A workflow decides what to do.
            Actions run across your tools. You see the result.
          </p>
        </div>

        <ol className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {EVENT_LOOP_STEPS.map(
            ({ name, icon: Icon, example, description }, index) => {
              const isActive = index === activeIndex;
              const isLast = index === EVENT_LOOP_STEPS.length - 1;

              return (
                <li key={name} className="relative">
                  <Reveal delay={index * 90} className="h-full">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => pick(index)}
                      onFocus={() => pick(index)}
                      onMouseEnter={() => pick(index)}
                      className={cn(
                        "flex h-full w-full cursor-pointer flex-col gap-3 rounded-[14px] border border-input bg-card p-5 text-left transition-[border-color,box-shadow,translate] duration-300 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                        {
                          "border-primary shadow-[0_0_0_4px_var(--accent-soft),0_20px_60px_color-mix(in_oklab,var(--primary)_20%,transparent)] motion-safe:-translate-y-1":
                            isActive,
                        },
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "grid size-8 place-items-center rounded-[8px] border border-input text-foreground transition-colors duration-300",
                            { "border-primary text-accent-text": isActive },
                          )}
                        >
                          <Icon aria-hidden className="size-4" />
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground/70 uppercase">
                          {name}
                        </span>
                      </span>
                      <span className="text-[15px] font-medium">{example}</span>
                      <span className="text-[13px] text-muted-foreground">
                        {description}
                      </span>
                    </button>
                  </Reveal>
                  {isLast ? null : <FlowArrow index={index} />}
                </li>
              );
            },
          )}
        </ol>
      </div>
    </section>
  );
}
