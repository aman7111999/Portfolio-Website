import { PORTFOLIO_ANALYSIS_COVER_WEBP } from "@/data/portfolioAnalysisCoverAsset";

export function applyPortfolioAnalysisVisualCorrection<T extends { slug: string }>(project: T): T {
  if (project.slug !== "portfolio-analysis") return project;

  const current = project as T & {
    thumbnail_url?: string | null;
    presentation?: Record<string, unknown> | null;
  };
  const presentation = current.presentation && typeof current.presentation === "object"
    ? current.presentation
    : {};
  const currentHero =
    presentation.hero && typeof presentation.hero === "object"
      ? (presentation.hero as Record<string, unknown>)
      : {};

  return {
    ...current,
    thumbnail_url: PORTFOLIO_ANALYSIS_COVER_WEBP,
    presentation: {
      ...presentation,
      hero: {
        ...currentHero,
        style: "image",
        image_url: PORTFOLIO_ANALYSIS_COVER_WEBP,
        image_alt:
          "Portfolio Analysis cover highlighting performance, allocation, risk, and diversification",
      },
    },
  } as T;
}
