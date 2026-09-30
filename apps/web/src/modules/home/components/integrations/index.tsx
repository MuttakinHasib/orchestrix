import { INTEGRATION_MARKS } from "./constants/integration-marks";

export function Integrations() {
  return (
    <section
      id="integrations"
      aria-labelledby="integrations-heading"
      className="flex flex-col items-center gap-6 border-t border-border px-4 py-18 sm:px-6"
    >
      <h2
        id="integrations-heading"
        className="text-[13px] text-muted-foreground/70"
      >
        Connects to the tools your team already uses
      </h2>
      <ul className="flex flex-wrap justify-center gap-3.5">
        {INTEGRATION_MARKS.map(({ name, icon: Icon }) => (
          <li
            key={name}
            className="flex h-12 items-center gap-2.5 rounded-lg border border-border bg-card px-4.5 text-muted-foreground"
          >
            <Icon aria-hidden className="size-4.25" />
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
