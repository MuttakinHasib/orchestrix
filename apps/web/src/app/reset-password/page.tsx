import type { Metadata } from "next";

import { ResetPasswordPage } from "@/modules/auth/usecases/reset-password-page";

export const metadata: Metadata = {
  title: "Set a new password",
  robots: { index: false },
};

const Page = async ({ searchParams }: PageProps<"/reset-password">) => {
  const { token } = await searchParams;

  return <ResetPasswordPage token={typeof token === "string" ? token : null} />;
};

export default Page;
