function AuthHeading({
  title,
  description,
}: {
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <h1 className="text-[26px] leading-tight font-medium tracking-[-0.02em]">
        {title}
      </h1>
      <p className="text-pretty text-muted-foreground">{description}</p>
    </div>
  );
}

export { AuthHeading };
