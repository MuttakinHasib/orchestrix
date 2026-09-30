import type { Metadata } from "next";

import { SignUpPage } from "@/modules/auth/usecases/sign-up-page";

export const metadata: Metadata = {
  title: "Create your account",
};

const Page = () => <SignUpPage />;

export default Page;
