import { Seo } from "@/lib/seo";
import { useSite } from "@/lib/cms";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Experience } from "@/components/home/Experience";
import { StatsBand } from "@/components/home/StatsBand";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  const { data: site } = useSite();

  return (
    <>
      <Seo
        title={`${site?.name ?? "Aman Mishra"} — Senior Product Designer`}
        description={site?.tagline ?? "Product designer crafting next-horizon experiences."}
        path="/"
        siteName={site?.name ?? "Aman Mishra"}
      />

      <Hero />
      <FeaturedWork />
      <Experience />
      <StatsBand />
      <FaqSection />
      <FinalCta />
    </>
  );
}
