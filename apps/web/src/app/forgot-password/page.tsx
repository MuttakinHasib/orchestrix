import type { Metadata } from "next";

import { ForgotPasswordPage } from "@/modules/auth/usecases/forgot-password-page";

export const metadata: Metadata = {
  title: "Reset your password",
};

const Page = () => <ForgotPasswordPage />;

export default Page;
