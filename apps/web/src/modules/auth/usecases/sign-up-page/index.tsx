import Link from "next/link";

import { AuthHeading } from "@/modules/auth/components/auth-heading";
import { AuthShell } from "@/modules/auth/layouts/auth-shell";
import { ROUTES } from "@/modules/core/constants/routes";

import { SignUpForm } from "./components/sign-up-form";

function SignUpPage() {
  return (
    <AuthShell
      aside={
        <>
          Have an account?{" "}
          <Link
            href={ROUTES.signIn}
            className="text-accent-text hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <AuthHeading
        title="Create your account"
        description="Free for teams up to 10."
      />
      <SignUpForm />
    </AuthShell>
  );
}

export { SignUpPage };
