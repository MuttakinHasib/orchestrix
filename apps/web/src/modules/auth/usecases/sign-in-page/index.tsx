import Link from "next/link";

import { AuthHeading } from "@/modules/auth/components/auth-heading";
import { AuthShell } from "@/modules/auth/layouts/auth-shell";
import { ROUTES } from "@/modules/core/constants/routes";

import { SignInForm } from "./components/sign-in-form";

function SignInPage() {
  return (
    <AuthShell
      aside={
        <>
          No account?{" "}
          <Link
            href={ROUTES.signUp}
            className="text-accent-text hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <AuthHeading title="Sign in to Orchestrix" description="Welcome back." />
      <SignInForm />
    </AuthShell>
  );
}

export { SignInPage };
