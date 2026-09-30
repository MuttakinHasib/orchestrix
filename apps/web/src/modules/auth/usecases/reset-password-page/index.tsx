import { AuthHeading } from "@/modules/auth/components/auth-heading";
import { AuthShell } from "@/modules/auth/components/auth-shell";
import { NeedHelpLink } from "@/modules/auth/components/need-help-link";

import { InvalidResetLink } from "./components/invalid-reset-link";
import { ResetPasswordForm } from "./components/reset-password-form";

interface ResetPasswordPageProps {
  /** The token from the emailed reset link, or null when the link has none. */
  token: string | null;
}

export function ResetPasswordPage({ token }: ResetPasswordPageProps) {
  return (
    <AuthShell aside={<NeedHelpLink />}>
      {token ? (
        <>
          <AuthHeading
            title="Set a new password"
            description="Choose a password you don’t use anywhere else."
          />
          <ResetPasswordForm token={token} />
        </>
      ) : (
        <InvalidResetLink />
      )}
    </AuthShell>
  );
}
