import { AuthShell } from "@/modules/auth/components/auth-shell";
import { NeedHelpLink } from "@/modules/auth/components/need-help-link";

import { ForgotPasswordFlow } from "./components/forgot-password-flow";

export function ForgotPasswordPage() {
  return (
    <AuthShell aside={<NeedHelpLink />}>
      <ForgotPasswordFlow />
    </AuthShell>
  );
}
