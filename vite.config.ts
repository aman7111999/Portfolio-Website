import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Public Supabase connection values (anon key; safe for client bundle).
const DEFAULT_SUPABASE_URL = "https://phsbpngyfobtieyekewp.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_JMQ5V0ZTb1Pme0tX-wOSDQ_9QDOcdw8";

type StaticPage = { path: string; title: string; description: string };

const STATIC_PAGES: StaticPage[] = [
  {
    path: "/work",
    title: "Selected Product Design Work — Aman Mishra",
    description:
      "Case studies across fintech, 0-to-1 products, personalisation, portfolio insights, and design systems.",
  },
  {
    path: "/about",
    title: "About — Aman Mishra, Senior Product Designer",
    description:
      "Aman Mishra is a Senior Product Designer focused on fintech, AI-assisted experiences, personalisation, and scalable product systems.",
  },
  {
    path: "/resume",
    title: "Résumé — Aman Mishra, Senior Product Designer",
    description:
      "Aman Mishra’s product-design experience across Motilal Oswal, Trinkerr, fintech, AI-assisted products, and design systems.",
  },
  {
    path: "/contact",
    title: "Contact — Aman Mishra, Senior Product Designer",
    description:
      "Contact Aman Mishra about Senior Product Designer opportunities across fintech, AI, personalisation, and complex product platforms.",
  },
];

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function staticHead(site: string, page: StaticPage, noindex = false) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const url = `${site}${page.path}`;
  return `<!-- static-head:start -->
    <link data-static-head rel="canonical" href="${url}" />
    <title data-static-head>${title}</title>
    <meta data-static-head name="description" content="${description}" />
    <meta data-static-head name="robots" content="${noindex ? "noindex, nofollow" : "index, follow"}" />
    <meta data-static-head property="og:type" content="website" />
    <meta data-static-head property="og:title" content="${title}" />
    <meta data-static-head property="og:description" content="${description}" />
    <meta data-static-head property="og:url" content="${url}" />
    <meta data-static-head property="og:image" content="${site}/og-preview.jpg" />
    <meta data-static-head property="og:image:alt" content="Aman Mishra, Senior Product Designer" />
    <meta data-static-head property="og:image:width" content="1200" />
    <meta data-static-head property="og:image:height" content="630" />
    <meta data-static-head property="og:site_name" content="Aman Mishra" />
    <meta data-static-head name="twitter:card" content="summary_large_image" />
    <meta data-static-head name="twitter:title" content="${title}" />
    <meta data-static-head name="twitter:description" content="${description}" />
    <meta data-static-head name="twitter:image" content="${site}/og-preview.jpg" />
    <!-- static-head:end -->`;
}

// Post-build: emit crawlable public route shells, a real 404, and a public-only sitemap.
function portfolioStatic() {
  return {
    name: "gh-pages-static",
    apply: "build" as const,
    closeBundle() {
      const outDir = resolve(process.cwd(), "dist");
      const indexPath = resolve(outDir, "index.html");
      if (existsSync(indexPath)) {
        const indexHtml = readFileSync(indexPath, "utf8");
        const site = (process.env.VITE_SITE_URL ?? "https://amanux.vercel.app").replace(/\/$/, "");
        const marker = /<!-- static-head:start -->[\s\S]*?<!-- static-head:end -->/;

        for (const page of STATIC_PAGES) {
          const directory = resolve(outDir, page.path.slice(1));
          mkdirSync(directory, { recursive: true });
          writeFileSync(
            resolve(directory, "index.html"),
            indexHtml.replace(marker, staticHead(site, page)),
          );
        }

        const notFound = {
          path: "/404",
          title: "Page not found — Aman Mishra",
          description: "The requested page could not be found.",
        };
        writeFileSync(
          resolve(outDir, "404.html"),
          indexHtml.replace(marker, staticHead(site, notFound, true)),
        );

        const protectedPage = {
          path: "/projects",
          title: "Protected case studies — Aman Mishra",
          description: "Password required to view these confidential product-design case studies.",
        };
        writeFileSync(
          resolve(outDir, "protected.html"),
          indexHtml.replace(marker, staticHead(site, protectedPage, true)),
        );

        const adminPage = {
          path: "/admin",
          title: "Portfolio CMS — Aman Mishra",
          description: "Private portfolio content management.",
        };
        writeFileSync(
          resolve(outDir, "admin-shell.html"),
          indexHtml.replace(marker, staticHead(site, adminPage, true)),
        );
      }
      const site = (process.env.VITE_SITE_URL ?? "https://amanux.vercel.app").replace(/\/$/, "");
      const staticRoutes = ["/", ...STATIC_PAGES.map((page) => page.path)];
      const urls = staticRoutes
        .map((path) => `  <url><loc>${site}${path}</loc><changefreq>monthly</changefreq></url>`)
        .join("\n");
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
      writeFileSync(resolve(outDir, "sitemap.xml"), xml);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    base: process.env.VITE_BASE ?? "/",
    plugins: [
      react(),
      tailwindcss(),
      ...(mode === "development" ? [mcpPlugin()] : []),
      portfolioStatic(),
    ],
    resolve: { tsconfigPaths: true },
    server: { host: "::", port: 8080, strictPort: true },
    preview: { host: "::", port: 8080, strictPort: true },
    define: {
      // Fallbacks so Vercel (or any build env without a .env file) still works.
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
        env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL,
      ),
      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
        env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_PUBLISHABLE_KEY,
      ),
    },
    build: {
      target: "es2020",
      cssCodeSplit: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes("node_modules")) return;
            if (id.includes("framer-motion")) return "motion-vendor";
            if (id.includes("@supabase")) return "supabase-vendor";
            if (id.includes("@tanstack")) return "query-vendor";
            if (id.includes("react-router")) return "router-vendor";
            if (id.includes("react-dom") || id.includes("/react/")) return "react-vendor";
            if (id.includes("@radix-ui")) return "radix-vendor";
            if (id.includes("lucide-react")) return "icons-vendor";
          },
        },
      },
    },
  };
});
