"use client";

import { useEffect, useRef, type ReactNode } from "react";

const REVEAL_KEYFRAMES: Keyframe[] = [
  { opacity: 0, transform: "translateY(32px)" },
  { opacity: 1, transform: "none" },
];

interface RevealProps {
  children: ReactNode;
  /** Milliseconds to wait once in view, to stagger siblings. */
  delay?: number;
  className?: string;
}

/**
 * Rises its content into place the first time it scrolls into view. Content
 * is only hidden once the observer is in place, so nothing stays invisible
 * without JavaScript or under reduced motion.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    element.style.opacity = "0";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        element.style.opacity = "";
        element.animate(REVEAL_KEYFRAMES, {
          duration: 900,
          delay,
          easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
          fill: "backwards",
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      element.style.opacity = "";
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
