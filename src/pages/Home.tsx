import { Seo } from "@/lib/seo";
import { useSite } from "@/lib/cms";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { StatsBand } from "@/components/home/StatsBand";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  const { data: site } = useSite();
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site?.name ?? "Aman Mishra",
    jobTitle: "Senior Product Designer",
    url: "https://amanux.vercel.app/",
    sameAs: (site?.socials ?? []).map((social) => social.url),
  };

  return (
    <>
      <Seo
        title={`${site?.name ?? "Aman Mishra"} — Senior Product Designer`}
        description={site?.tagline ?? "Product designer crafting next-horizon experiences."}
        path="/"
        siteName={site?.name ?? "Aman Mishra"}
        jsonLd={personSchema}
      />

      <Hero />
      <FeaturedWork />
      <StatsBand />
      <FinalCta />
    </>
  );
}
