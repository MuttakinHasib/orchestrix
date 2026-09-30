import { CtaSection } from "@/modules/home/components/cta-section";
import { FeaturesSection } from "@/modules/home/components/features-section";
import { HeroSection } from "@/modules/home/components/hero-section";
import { IntegrationsSection } from "@/modules/home/components/integrations-section";
import { LoopSection } from "@/modules/home/components/loop-section";
import { SiteFooter } from "@/modules/home/components/site-footer";
import { SiteHeader } from "@/modules/home/components/site-header";

function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <LoopSection />
        <FeaturesSection />
        <IntegrationsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}

export { HomePage };
