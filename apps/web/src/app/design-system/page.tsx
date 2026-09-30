import type { Metadata } from "next";

import { DesignSystemPage } from "@/modules/design-system/usecases/design-system-page";

export const metadata: Metadata = {
  title: "Design system",
};

const Page = () => <DesignSystemPage />;

export default Page;
