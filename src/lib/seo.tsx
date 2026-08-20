import { Helmet } from "react-helmet-async";
import { useLayoutEffect } from "react";

type Props = {
  title: string;
  description?: string;
  path: string;
  ogType?: "website" | "article";
  jsonLd?: Record<string, unknown>;
  siteName?: string;
  noindex?: boolean;
  image?: string | null;
};

export function Seo({
  title,
  description,
  path,
  ogType = "website",
  jsonLd,
  siteName = "Portfolio",
  noindex,
  image,
}: Props) {
  useLayoutEffect(() => {
    document.querySelectorAll("[data-static-head]").forEach((element) => element.remove());
  }, []);

  const fullTitle = title.includes(siteName) ? title : `${title} — ${siteName}`;
  const desc = description ?? "";
  const siteUrl = (import.meta.env.VITE_SITE_URL || "https://amanux.vercel.app").replace(/\/$/, "");
  const absoluteUrl = new URL(path, `${siteUrl}/`).toString();
  const ogImage = image ? new URL(image, `${siteUrl}/`).toString() : `${siteUrl}/og-preview.jpg`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {desc && <meta name="description" content={desc} />}
      <link rel="canonical" href={absoluteUrl} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta property="og:title" content={fullTitle} />
      {desc && <meta property="og:description" content={desc} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${fullTitle} social preview`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:title" content={fullTitle} />
      {desc && <meta name="twitter:description" content={desc} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && !noindex ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
