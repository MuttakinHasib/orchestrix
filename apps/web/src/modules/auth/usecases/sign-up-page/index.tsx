import Link from "next/link";
import { cn } from "cn";

import { AuthHeading } from "@/modules/auth/components/auth-heading";
import { AuthShell } from "@/modules/auth/components/auth-shell";
import { OAuthButton } from "@/modules/auth/components/oauth-button";
import { OrDivider } from "@/modules/auth/components/or-divider";
import { OAuthProvider } from "@/modules/auth/types/auth-service";
import { TOUCH_TARGET } from "@/modules/auth/constants/touch-target";
import { ROUTES } from "@/modules/core/constants/routes";

import { SignUpForm } from "./components/sign-up-form";

export function SignUpPage() {
  return (
    <AuthShell
      aside={
        <>
          Have an account?{" "}
          <Link
            href={ROUTES.SIGN_IN}
            className={cn(TOUCH_TARGET, "text-foreground hover:underline")}
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

      <OAuthButton provider={OAuthProvider.GITHUB}>
        Sign up with GitHub
      </OAuthButton>

      <OrDivider>or</OrDivider>

      <SignUpForm />

      <p className="text-center text-xs text-pretty text-muted-foreground/70">
        By continuing you agree to the{" "}
        <Link
          href={ROUTES.COMING_SOON}
          className="text-inherit underline-offset-2 hover:underline"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href={ROUTES.COMING_SOON}
          className="text-inherit underline-offset-2 hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </AuthShell>
  );
}
