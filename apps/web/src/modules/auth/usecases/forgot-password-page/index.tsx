import Link from "next/link";

import { AuthShell } from "@/modules/auth/layouts/auth-shell";
import { ROUTES } from "@/modules/core/constants/routes";

import { ForgotPasswordFlow } from "./components/forgot-password-flow";

function ForgotPasswordPage() {
  return (
    <AuthShell
      aside={
        <>
          Need help?{" "}
          <Link
            href={ROUTES.signIn}
            className="text-accent-text hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <ForgotPasswordFlow />
    </AuthShell>
  );
}

export { ForgotPasswordPage };
