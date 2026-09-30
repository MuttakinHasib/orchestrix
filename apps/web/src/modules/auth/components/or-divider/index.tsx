import type { ReactNode } from "react";

interface OrDividerProps {
  children: ReactNode;
}

export function OrDivider({ children }: OrDividerProps) {
  return (
    <div className="flex w-full items-center gap-3 text-xs text-muted-foreground/70">
      <span aria-hidden className="h-px flex-1 bg-border" />
      {children}
      <span aria-hidden className="h-px flex-1 bg-border" />
    </div>
  );
}
