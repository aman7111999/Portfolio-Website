import {
  PORTFOLIO_ANALYSIS_SCENARIOS,
  type PortfolioAnalysisScreenTheme,
} from "@/data/portfolioAnalysisScreens";

export type ProjectVisualStyle = "auto" | "image" | "signature" | "generated";

export type ProjectType = "case_study" | "revamp_comparison";

export type ProjectComparisonStage = {
  id: string;
  label: string;
  title: string;
  timeframe: string;
  image_url: string | null;
  image_alt: string;
  description: string;
  highlights: string[];
};

export type ProjectComparisonPresentation = {
  eyebrow: string;
  title: string;
  description: string;
  stages: ProjectComparisonStage[];
};

export type ProjectSectionKey =
  "overview" | "problem" | "research" | "process" | "solution" | "impact" | "reflection";

export type ProjectSectionPresentation = {
  visible: boolean;
  label: string;
  eyebrow: string;
  title: string;
};

export type ProjectJourneyItem = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
};

export type ProjectStoryScreen = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  image_alt: string;
  theme: PortfolioAnalysisScreenTheme;
};

export type ProjectStoryScenario = {
  id: string;
  tab_label: string;
  eyebrow: string;
  title: string;
  description: string;
  screens: ProjectStoryScreen[];
};

export type ArchitectureNode = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
};

export type ProjectPresentation = {
  type: ProjectType;
  card: {
    style: ProjectVisualStyle;
    image_alt: string;
    eyebrow: string;
  };
  hero: {
    style: ProjectVisualStyle;
    image_url: string | null;
    image_alt: string;
  };
  comparison: ProjectComparisonPresentation;
  story: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    description: string;
    architecture_nodes: ArchitectureNode[];
    journey_eyebrow: string;
    journey_title: string;
    journey_description: string;
    journey: ProjectJourneyItem[];
    scenarios: ProjectStoryScenario[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
  };
  prototype: {
    eyebrow: string;
    title: string;
    description: string;
  };
  labels: {
    back_to_work: string;
    company: string;
    timeline: string;
    role: string;
    duration: string;
    category: string;
    case_map: string;
    technology: string;
    tags: string;
    external_links: string;
    previous_project: string;
    next_project: string;
  };
  seo: {
    title: string;
    description: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    label: string;
    url: string;
  };
  sections: Record<ProjectSectionKey, ProjectSectionPresentation>;
};

export const PROJECT_SECTION_KEYS: ProjectSectionKey[] = [
  "overview",
  "problem",
  "research",
  "process",
  "solution",
  "impact",
  "reflection",
];

const sectionDefaults: Record<ProjectSectionKey, ProjectSectionPresentation> = {
  overview: { visible: true, label: "Overview", eyebrow: "The context", title: "Overview" },
  problem: {
    visible: true,
    label: "Problem",
    eyebrow: "What we faced",
    title: "Problem & business goal",
  },
  research: {
    visible: true,
    label: "Research",
    eyebrow: "What we learned",
    title: "Research & insights",
  },
  process: {
    visible: true,
    label: "Process",
    eyebrow: "How we built it",
    title: "Design process",
  },
  solution: {
    visible: true,
    label: "Solution",
    eyebrow: "High fidelity",
    title: "The solution",
  },
  impact: {
    visible: true,
    label: "Impact",
    eyebrow: "The outcome",
    title: "Impact",
  },
  reflection: {
    visible: true,
    label: "Reflection",
    eyebrow: "In hindsight",
    title: "Reflection & learnings",
  },
};

const portfolioJourneyDefaults: ProjectJourneyItem[] = [
  {
    id: "mo-stocks",
    title: "MO stocks",
    description:
      "Internal stock holdings move from an attention signal to the affected allocation and next step.",
    image_url: null,
  },
  {
    id: "external-stocks",
    title: "External stocks",
    description:
      "Linked stock holdings use the same analysis language while keeping the external source visible.",
    image_url: null,
  },
  {
    id: "mo-mutual-funds",
    title: "MO mutual funds",
    description:
      "Fund performance and concentration are prioritised, explained, and connected to the affected schemes.",
    image_url: null,
  },
  {
    id: "external-mutual-funds",
    title: "External mutual funds",
    description:
      "Imported funds follow the same stable hierarchy without hiding where the investments are held.",
    image_url: null,
  },
  {
    id: "risk-states",
    title: "Risk details and states",
    description:
      "Light, dark, collapsed, expanded, and breakdown states make the analysis buildable beyond one happy path.",
    image_url: null,
  },
];

const portfolioScenarioDefaults: ProjectStoryScenario[] = PORTFOLIO_ANALYSIS_SCENARIOS.map(
  (scenario) => ({
    id: scenario.id,
    tab_label: scenario.tabLabel,
    eyebrow: scenario.eyebrow,
    title: scenario.title,
    description: scenario.description,
    screens: scenario.screens.map((screen) => ({
      id: screen.id,
      title: screen.title,
      description: screen.description,
      image_url: screen.url,
      image_alt: screen.alt,
      theme: screen.theme,
    })),
  }),
);

const architectureDefaults: ArchitectureNode[] = [
  {
    id: "internal",
    eyebrow: "Source 01",
    title: "Motilal Oswal",
    description: "Existing stocks and mutual funds",
  },
  {
    id: "external",
    eyebrow: "Source 02",
    title: "External",
    description: "Linked brokers and portfolios",
  },
  {
    id: "intelligence",
    eyebrow: "Intelligence layer",
    title: "Unified diagnosis",
    description: "Risk · allocation · quality · diversification",
  },
  {
    id: "action",
    eyebrow: "Action",
    title: "Decision support",
    description: "IAP · RM support · report",
  },
];

const comparisonStageDefaults: ProjectComparisonStage[] = [
  {
    id: "oldest",
    label: "Oldest",
    title: "Original experience",
    timeframe: "Version 01",
    image_url: null,
    image_alt: "Original product design",
    description: "Show the earliest version and explain what limited the experience.",
    highlights: ["Original structure", "Key usability constraint"],
  },
  {
    id: "latest",
    label: "Latest",
    title: "Improved revamp",
    timeframe: "Current version",
    image_url: null,
    image_alt: "Latest improved product design",
    description: "Show the current version and explain what changed along the way.",
    highlights: ["Clearer hierarchy", "Lower decision effort"],
  },
];

const isObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

const text = (value: unknown, fallback: string) => (typeof value === "string" ? value : fallback);

const nullableText = (value: unknown, fallback: string | null = null) =>
  typeof value === "string" ? value : fallback;

const visualStyle = (value: unknown): ProjectVisualStyle =>
  value === "image" || value === "signature" || value === "generated" ? value : "auto";

const projectType = (value: unknown): ProjectType =>
  value === "revamp_comparison" ? "revamp_comparison" : "case_study";

const screenTheme = (value: unknown): PortfolioAnalysisScreenTheme =>
  value === "light" || value === "dark" ? value : "mixed";

export function getProjectPresentation(project: {
  slug: string;
  title?: string;
  short_description?: string | null;
  presentation?: unknown;
}): ProjectPresentation {
  const raw = isObject(project.presentation) ? project.presentation : {};
  const rawCard = isObject(raw.card) ? raw.card : {};
  const rawHero = isObject(raw.hero) ? raw.hero : {};
  const rawComparison = isObject(raw.comparison) ? raw.comparison : {};
  const rawStory = isObject(raw.story) ? raw.story : {};
  const rawGallery = isObject(raw.gallery) ? raw.gallery : {};
  const rawPrototype = isObject(raw.prototype) ? raw.prototype : {};
  const rawLabels = isObject(raw.labels) ? raw.labels : {};
  const rawSeo = isObject(raw.seo) ? raw.seo : {};
  const rawCta = isObject(raw.cta) ? raw.cta : {};
  const rawSections = isObject(raw.sections) ? raw.sections : {};
  const isPortfolioAnalysis = project.slug === "portfolio-analysis";

  const rawComparisonStages = Array.isArray(rawComparison.stages) ? rawComparison.stages : [];
  const comparisonStagesSource =
    rawComparisonStages.length >= 2 ? rawComparisonStages.slice(0, 3) : comparisonStageDefaults;
  const comparisonStages = comparisonStagesSource.map((item, index) => {
    const source = isObject(item) ? item : {};
    const fallback = comparisonStageDefaults[index] ?? {
      id: `stage-${index + 1}`,
      label: `Version ${index + 1}`,
      title: "Design iteration",
      timeframe: "",
      image_url: null,
      image_alt: `Design iteration ${index + 1}`,
      description: "",
      highlights: [],
    };
    return {
      id: text(source.id, fallback.id),
      label: text(source.label, fallback.label),
      title: text(source.title, fallback.title),
      timeframe: text(source.timeframe, fallback.timeframe),
      image_url: nullableText(source.image_url, fallback.image_url),
      image_alt: text(source.image_alt, fallback.image_alt),
      description: text(source.description, fallback.description),
      highlights: Array.isArray(source.highlights)
        ? source.highlights.filter((item): item is string => typeof item === "string").slice(0, 6)
        : fallback.highlights,
    };
  });

  const sections = PROJECT_SECTION_KEYS.reduce(
    (result, key) => {
      const source = isObject(rawSections[key]) ? rawSections[key] : {};
      const fallback = sectionDefaults[key];
      result[key] = {
        visible: typeof source.visible === "boolean" ? source.visible : fallback.visible,
        label: text(source.label, fallback.label),
        eyebrow: text(source.eyebrow, fallback.eyebrow),
        title: text(source.title, fallback.title),
      };
      return result;
    },
    {} as Record<ProjectSectionKey, ProjectSectionPresentation>,
  );

  const rawJourney = Array.isArray(rawStory.journey) ? rawStory.journey : [];
  const journeySource = rawJourney.length > 0 ? rawJourney : portfolioJourneyDefaults;
  const journey = journeySource.map((item, index) => {
    const source = isObject(item) ? item : {};
    const fallback = portfolioJourneyDefaults[index] ?? {
      id: `step-${index + 1}`,
      title: `Step ${index + 1}`,
      description: "",
      image_url: null,
    };
    return {
      id: text(source.id, fallback.id),
      title: text(source.title, fallback.title),
      description: text(source.description, fallback.description),
      image_url: nullableText(source.image_url, fallback.image_url),
    };
  });

  const rawScenarios = Array.isArray(rawStory.scenarios) ? rawStory.scenarios : null;
  const scenarioSource = rawScenarios ?? (isPortfolioAnalysis ? portfolioScenarioDefaults : []);
  const scenarios = scenarioSource.slice(0, 12).map((item, scenarioIndex) => {
    const source = isObject(item) ? item : {};
    const fallback = portfolioScenarioDefaults[scenarioIndex] ?? {
      id: `scenario-${scenarioIndex + 1}`,
      tab_label: `View ${scenarioIndex + 1}`,
      eyebrow: "Portfolio view",
      title: "Portfolio analysis view",
      description: "",
      screens: [],
    };
    const rawScreens = Array.isArray(source.screens) ? source.screens : fallback.screens;
    const screens = rawScreens.slice(0, 24).map((screenItem, screenIndex) => {
      const screenSource = isObject(screenItem) ? screenItem : {};
      const screenFallback = fallback.screens[screenIndex] ?? {
        id: `screen-${scenarioIndex + 1}-${screenIndex + 1}`,
        title: `Screen ${screenIndex + 1}`,
        description: "",
        image_url: null,
        image_alt: `Portfolio Analysis screen ${screenIndex + 1}`,
        theme: "mixed" as const,
      };
      return {
        id: text(screenSource.id, screenFallback.id),
        title: text(screenSource.title, screenFallback.title),
        description: text(screenSource.description, screenFallback.description),
        image_url: nullableText(screenSource.image_url, screenFallback.image_url),
        image_alt: text(screenSource.image_alt, screenFallback.image_alt),
        theme: screenTheme(screenSource.theme ?? screenFallback.theme),
      };
    });

    return {
      id: text(source.id, fallback.id),
      tab_label: text(source.tab_label, fallback.tab_label),
      eyebrow: text(source.eyebrow, fallback.eyebrow),
      title: text(source.title, fallback.title),
      description: text(source.description, fallback.description),
      screens,
    };
  });

  const rawNodes = Array.isArray(rawStory.architecture_nodes) ? rawStory.architecture_nodes : [];
  const nodeSource = rawNodes.length > 0 ? rawNodes : architectureDefaults;
  const architectureNodes = nodeSource.map((item, index) => {
    const source = isObject(item) ? item : {};
    const fallback = architectureDefaults[index] ?? {
      id: `node-${index + 1}`,
      eyebrow: `Stage ${index + 1}`,
      title: "New stage",
      description: "",
    };
    return {
      id: text(source.id, fallback.id),
      eyebrow: text(source.eyebrow, fallback.eyebrow),
      title: text(source.title, fallback.title),
      description: text(source.description, fallback.description),
    };
  });

  return {
    type: projectType(raw.type),
    card: {
      style: visualStyle(rawCard.style),
      image_alt: text(rawCard.image_alt, `${project.title ?? "Project"} preview`),
      eyebrow: text(rawCard.eyebrow, isPortfolioAnalysis ? "Portfolio intelligence" : "Case study"),
    },
    hero: {
      style: visualStyle(rawHero.style),
      image_url: nullableText(rawHero.image_url),
      image_alt: text(rawHero.image_alt, `${project.title ?? "Project"} case study`),
    },
    comparison: {
      eyebrow: text(rawComparison.eyebrow, "Design evolution"),
      title: text(rawComparison.title, "How the experience changed over time."),
      description: text(
        rawComparison.description,
        "A direct comparison of the hierarchy, interaction model, and product decisions across each major revamp.",
      ),
      stages: comparisonStages,
    },
    story: {
      enabled: typeof rawStory.enabled === "boolean" ? rawStory.enabled : isPortfolioAnalysis,
      eyebrow: text(rawStory.eyebrow, "Experience architecture"),
      title: text(rawStory.title, "One analysis model across four portfolio views."),
      description: text(
        rawStory.description,
        "Motilal Oswal and external holdings remain distinct, while stocks and mutual funds share a consistent path from risk signal to explanation and an appropriate next step.",
      ),
      architecture_nodes: architectureNodes,
      journey_eyebrow: text(rawStory.journey_eyebrow, "Real product screens"),
      journey_title: text(rawStory.journey_title, "Four portfolios. Every important state."),
      journey_description: text(
        rawStory.journey_description,
        "Explore the supplied MO and external stock and mutual-fund flows. Each screen is scrollable here and available at full resolution.",
      ),
      journey,
      scenarios,
    },
    gallery: {
      eyebrow: text(rawGallery.eyebrow, "Visual archive"),
      title: text(rawGallery.title, "Selected artifacts"),
      description: text(
        rawGallery.description,
        "Screens and flows from the project. Tap any image to expand it.",
      ),
    },
    prototype: {
      eyebrow: text(rawPrototype.eyebrow, "Try it live"),
      title: text(rawPrototype.title, "Interactive prototype"),
      description: text(
        rawPrototype.description,
        "Click through the working prototype as a user would. It works best on desktop, and the expand icon opens it full screen.",
      ),
    },
    labels: {
      back_to_work: text(rawLabels.back_to_work, "Back to work"),
      company: text(rawLabels.company, "Company"),
      timeline: text(rawLabels.timeline, "Timeline"),
      role: text(rawLabels.role, "Role"),
      duration: text(rawLabels.duration, "Duration"),
      category: text(rawLabels.category, "Category"),
      case_map: text(rawLabels.case_map, "Case map"),
      technology: text(rawLabels.technology, "Technology"),
      tags: text(rawLabels.tags, "Tags"),
      external_links: text(rawLabels.external_links, "External links"),
      previous_project: text(rawLabels.previous_project, "Previous"),
      next_project: text(rawLabels.next_project, "Next"),
    },
    seo: {
      title: text(rawSeo.title, project.title ?? "Project"),
      description: text(rawSeo.description, project.short_description ?? ""),
    },
    cta: {
      eyebrow: text(rawCta.eyebrow, "Let's build together"),
      title: text(rawCta.title, "Have a problem worth solving?"),
      label: text(rawCta.label, "Start a conversation"),
      url: text(rawCta.url, "/contact"),
    },
    sections,
  };
}

export function resolveCardVisual(project: {
  slug: string;
  thumbnail_url?: string | null;
  presentation?: unknown;
}) {
  const presentation = getProjectPresentation(project);
  if (presentation.card.style === "image") {
    return project.thumbnail_url ? "image" : "generated";
  }
  if (presentation.card.style === "signature") {
    return project.slug === "portfolio-analysis" ? "signature" : "generated";
  }
  if (presentation.card.style === "generated") return "generated";
  if (project.thumbnail_url) return "image";
  return project.slug === "portfolio-analysis" ? "signature" : "generated";
}

export function resolveHeroVisual(project: {
  slug: string;
  title?: string;
  short_description?: string | null;
  thumbnail_url?: string | null;
  presentation?: unknown;
}) {
  const presentation = getProjectPresentation(project);
  const imageUrl = presentation.hero.image_url || project.thumbnail_url || null;
  if (presentation.hero.style === "image") {
    return { kind: imageUrl ? ("image" as const) : ("generated" as const), imageUrl };
  }
  if (presentation.hero.style === "signature") {
    return {
      kind: project.slug === "portfolio-analysis" ? ("signature" as const) : ("generated" as const),
      imageUrl: null,
    };
  }
  if (presentation.hero.style === "generated") {
    return { kind: "generated" as const, imageUrl: null };
  }
  if (imageUrl) return { kind: "image" as const, imageUrl };
  return {
    kind: project.slug === "portfolio-analysis" ? ("signature" as const) : ("generated" as const),
    imageUrl: null,
  };
}
