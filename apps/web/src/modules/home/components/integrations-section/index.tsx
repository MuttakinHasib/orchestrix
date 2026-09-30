import { INTEGRATIONS } from "@/modules/home/constants/integrations";

function IntegrationsSection() {
  return (
    <section
      id="integrations"
      className="flex flex-col items-center gap-6 border-t border-border bg-secondary px-6 py-18 lg:px-12"
    >
      <span className="text-center text-muted-foreground/70">
        Connects to the tools your team already uses
      </span>
      <ul className="flex flex-wrap justify-center gap-3.5">
        {INTEGRATIONS.map(({ name, icon: Icon }) => (
          <li
            key={name}
            className="flex h-12 items-center gap-2.5 rounded-lg border border-border bg-card px-4.5 text-muted-foreground"
          >
            <Icon aria-hidden className="size-[17px]" />
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export { IntegrationsSection };
