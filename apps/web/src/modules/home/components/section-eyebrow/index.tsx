interface SectionEyebrowProps {
  /** Position in the page's numbered sequence, e.g. "01". */
  number: string;
  label: string;
}

export function SectionEyebrow({ number, label }: SectionEyebrowProps) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-xs tracking-[0.12em] text-accent-text uppercase">
      <span className="text-muted-foreground/70">{number}</span>
      <span aria-hidden className="h-px w-4 bg-input" />
      {label}
    </p>
  );
}
