import type { Metadata } from "next";

import { SignInPage } from "@/modules/auth/usecases/sign-in-page";

export const metadata: Metadata = {
  title: "Sign in",
};

const Page = () => <SignInPage />;

export default Page;
