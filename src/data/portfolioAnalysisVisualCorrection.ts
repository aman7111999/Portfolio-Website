type PresentationRecord = Record<string, unknown>;

const asRecord = (value: unknown): PresentationRecord =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as PresentationRecord)
    : {};

/**
 * Portfolio Analysis has an art-directed visual made from the real product
 * screens. Keep the CMS content intact, but make that visual the default for
 * both the project card and case-study hero instead of a generated cover image.
 */
export function applyPortfolioAnalysisVisualCorrection<
  T extends { slug: string; presentation?: unknown },
>(project: T): T {
  if (project.slug !== "portfolio-analysis") return project;

  const presentation = asRecord(project.presentation);
  const card = asRecord(presentation.card);
  const hero = asRecord(presentation.hero);

  return {
    ...project,
    presentation: {
      ...presentation,
      card: { ...card, style: "signature" },
      hero: { ...hero, style: "signature" },
    },
  } as T;
}
