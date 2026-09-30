import Link from "next/link";

import { AuthHeading } from "@/modules/auth/components/auth-heading";
import { AuthShell } from "@/modules/auth/components/auth-shell";
import { OAuthButton } from "@/modules/auth/components/oauth-button";
import { OrDivider } from "@/modules/auth/components/or-divider";
import { OAuthProvider } from "@/modules/auth/types/auth-service";
import { ROUTES } from "@/modules/core/constants/routes";

import { SignInForm } from "./components/sign-in-form";

export function SignInPage() {
  return (
    <AuthShell
      aside={
        <>
          No account?{" "}
          <Link
            href={ROUTES.SIGN_UP}
            className="text-foreground hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <AuthHeading title="Sign in to Orchestrix" description="Welcome back." />

      <div className="flex w-full flex-col gap-2">
        <OAuthButton provider={OAuthProvider.GITHUB}>
          Continue with GitHub
        </OAuthButton>
        <OAuthButton provider={OAuthProvider.GOOGLE}>
          Continue with Google
        </OAuthButton>
        <OAuthButton provider={OAuthProvider.SAML}>
          Single sign-on (SAML)
        </OAuthButton>
      </div>

      <OrDivider>or with email</OrDivider>

      <SignInForm />

      <p className="text-[13px] text-muted-foreground">
        No account yet?{" "}
        <Link
          href={ROUTES.SIGN_UP}
          className="text-accent-text hover:underline"
        >
          Create one
        </Link>
      </p>
    </AuthShell>
  );
}
