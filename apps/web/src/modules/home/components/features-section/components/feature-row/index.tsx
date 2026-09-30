import { Check } from "lucide-react";

type FeatureRowProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  children: React.ReactNode;
};

function FeatureRow({
  id,
  eyebrow,
  title,
  description,
  bullets,
  children,
}: FeatureRowProps) {
  return (
    <div
      id={id}
      className="grid items-center gap-10 lg:grid-cols-[420px_1fr] lg:gap-18"
    >
      <div className="flex flex-col gap-3.5">
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent-text">
          {eyebrow}
        </span>
        <h2 className="text-[30px] leading-[1.1] font-medium tracking-[-0.025em] sm:text-4xl">
          {title}
        </h2>
        <p className="text-pretty text-muted-foreground">{description}</p>
        {bullets ? (
          <ul className="mt-1.5 flex flex-col gap-2">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2">
                <Check aria-hidden className="size-3.5 text-primary" />
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export { FeatureRow };
