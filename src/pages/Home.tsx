import { Seo } from "@/lib/seo";
import { useSite } from "@/lib/cms";
import { Hero } from "@/components/Hero";
import { ServicesBento } from "@/components/home/ServicesBento";
import { VisionBento } from "@/components/home/VisionBento";
import { StatsBand } from "@/components/home/StatsBand";
import { TestimonialsGrid } from "@/components/home/TestimonialsRow";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  const { data: site } = useSite();

  const jsonLd = site
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name ?? "Aman Mishra",
        jobTitle: "Product Designer",
        url: "/",
        sameAs: (site.socials ?? []).map((s) => s.url),
      }
    : undefined;

  return (
    <>
      <Seo
        title={`${site?.name ?? "Aman Mishra"} — Product Designer`}
        description={site?.tagline ?? "Product designer crafting next-horizon experiences."}
        path="/"
        jsonLd={jsonLd}
        siteName={site?.name ?? "Aman Mishra"}
      />

      <Hero />
      <ServicesBento />
      <VisionBento />
      <StatsBand />
      <TestimonialsGrid />
      <FaqSection />
      <FinalCta />
    </>
  );
}
