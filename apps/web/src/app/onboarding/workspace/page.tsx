import type { Metadata } from "next";

import { OnboardingWorkspacePage } from "@/modules/auth/usecases/onboarding-workspace-page";

export const metadata: Metadata = {
  title: "Create your workspace",
  robots: { index: false },
};

const Page = () => <OnboardingWorkspacePage />;

export default Page;
