import type { Metadata } from "next";

import { DesignSystemPage } from "@/modules/design-system";

export const metadata: Metadata = {
  title: "Design system",
};

const Page = () => <DesignSystemPage />;

export default Page;
