import { Helmet } from "react-helmet-async";

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
  const fullTitle = title.includes(siteName) ? title : `${title} — ${siteName}`;
  const desc = description ?? "";
  const siteUrl = (import.meta.env.VITE_SITE_URL || "https://amanux.vercel.app").replace(/\/$/, "");
  const absoluteUrl = new URL(path, `${siteUrl}/`).toString();
  const ogImage = image ? new URL(image, `${siteUrl}/`).toString() : `${siteUrl}/og-preview.png`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {desc && <meta name="description" content={desc} />}
      <link rel="canonical" href={absoluteUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      {desc && <meta property="og:description" content={desc} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
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
