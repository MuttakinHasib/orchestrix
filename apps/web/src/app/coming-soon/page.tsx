import type { Metadata } from "next";

import { ComingSoonPage } from "@/modules/coming-soon";

export const metadata: Metadata = {
  title: "Coming soon",
  robots: { index: false },
};

const Page = () => <ComingSoonPage />;

export default Page;
