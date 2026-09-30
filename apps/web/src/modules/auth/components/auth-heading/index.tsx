import type { ReactNode } from "react";

interface AuthHeadingProps {
  title: string;
  description: ReactNode;
}

export function AuthHeading({ title, description }: AuthHeadingProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <h1 className="text-title font-medium text-balance">{title}</h1>
      <p className="text-pretty text-muted-foreground">{description}</p>
    </div>
  );
}
