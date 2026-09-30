import Link from "next/link";

/** "Question? Action" line under a form, e.g. "No account yet? Create one". */
function AuthFootnote({
  prompt,
  href,
  children,
}: {
  prompt: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <p className="text-center text-muted-foreground">
      {prompt}{" "}
      <Link href={href} className="text-accent-text hover:underline">
        {children}
      </Link>
    </p>
  );
}

export { AuthFootnote };
