import { AuthHeading } from "@/modules/auth/components/auth-heading";
import { AuthShell } from "@/modules/auth/components/auth-shell";

import { OnboardingProgress } from "./components/onboarding-progress";
import { SignedInAs } from "./components/signed-in-as";
import { WorkspaceForm } from "./components/workspace-form";

export function OnboardingWorkspacePage() {
  return (
    <AuthShell aside={<SignedInAs />}>
      <OnboardingProgress step={2} totalSteps={3} />
      <AuthHeading
        title="Create your workspace"
        description="A workspace holds your projects, teams and workflows."
      />
      <WorkspaceForm />
      <p className="text-[13px] text-muted-foreground">
        Next: create your first project
      </p>
    </AuthShell>
  );
}
