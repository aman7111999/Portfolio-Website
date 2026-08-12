export type ProjectVisualStyle = "auto" | "image" | "signature" | "generated";

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

export type ArchitectureNode = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
};

export type ProjectPresentation = {
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
    id: "entry",
    title: "Find the value",
    description:
      "A clear Portfolio Analysis entry point explains the outcome before asking for effort.",
    image_url: null,
  },
  {
    id: "scope",
    title: "Choose the scope",
    description:
      "Overall, Motilal Oswal, and External views keep source context visible without splitting the experience.",
    image_url: null,
  },
  {
    id: "connect",
    title: "Connect external wealth",
    description:
      "Broker import, consent, and syncing states make a high-trust transition feel predictable.",
    image_url: null,
  },
  {
    id: "stocks",
    title: "Read stock health",
    description:
      "Allocation, concentration, and red flags translate raw holdings into a prioritised diagnosis.",
    image_url: null,
  },
  {
    id: "funds",
    title: "Evaluate mutual funds",
    description:
      "Risk and diversification are explained in context, not presented as isolated financial scores.",
    image_url: null,
  },
  {
    id: "actions",
    title: "Move from insight to action",
    description:
      "IAP portfolios, an RM conversation, and report download support different levels of confidence.",
    image_url: null,
  },
];

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

const isObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

const text = (value: unknown, fallback: string) => (typeof value === "string" ? value : fallback);

const nullableText = (value: unknown, fallback: string | null = null) =>
  typeof value === "string" ? value : fallback;

const visualStyle = (value: unknown): ProjectVisualStyle =>
  value === "image" || value === "signature" || value === "generated" ? value : "auto";

export function getProjectPresentation(project: {
  slug: string;
  title?: string;
  short_description?: string | null;
  presentation?: unknown;
}): ProjectPresentation {
  const raw = isObject(project.presentation) ? project.presentation : {};
  const rawCard = isObject(raw.card) ? raw.card : {};
  const rawHero = isObject(raw.hero) ? raw.hero : {};
  const rawStory = isObject(raw.story) ? raw.story : {};
  const rawGallery = isObject(raw.gallery) ? raw.gallery : {};
  const rawPrototype = isObject(raw.prototype) ? raw.prototype : {};
  const rawLabels = isObject(raw.labels) ? raw.labels : {};
  const rawSeo = isObject(raw.seo) ? raw.seo : {};
  const rawCta = isObject(raw.cta) ? raw.cta : {};
  const rawSections = isObject(raw.sections) ? raw.sections : {};
  const isPortfolioAnalysis = project.slug === "portfolio-analysis";

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
    card: {
      style: visualStyle(rawCard.style),
      image_alt: text(rawCard.image_alt, `${project.title ?? "Project"} preview`),
      eyebrow: text(rawCard.eyebrow, "Case study"),
    },
    hero: {
      style: visualStyle(rawHero.style),
      image_url: nullableText(rawHero.image_url),
      image_alt: text(rawHero.image_alt, `${project.title ?? "Project"} case study`),
    },
    story: {
      enabled: typeof rawStory.enabled === "boolean" ? rawStory.enabled : isPortfolioAnalysis,
      eyebrow: text(rawStory.eyebrow, "Experience architecture"),
      title: text(rawStory.title, "One analysis model for every portfolio."),
      description: text(
        rawStory.description,
        "The interface keeps portfolio source visible, then applies the same diagnostic logic across internal and externally imported investments. Users learn one system instead of relearning the product for every broker or asset type.",
      ),
      architecture_nodes: architectureNodes,
      journey_eyebrow: text(rawStory.journey_eyebrow, "Screen journey"),
      journey_title: text(rawStory.journey_title, "Six moments. One continuous decision flow."),
      journey_description: text(
        rawStory.journey_description,
        "Each screen answers the next investor question while preserving context from the previous step.",
      ),
      journey,
    },
    gallery: {
      eyebrow: text(rawGallery.eyebrow, "Visual archive"),
      title: text(rawGallery.title, "Selected artifacts"),
      description: text(
        rawGallery.description,
        "Screens, flows, and moments from the design process — tap any image to expand.",
      ),
    },
    prototype: {
      eyebrow: text(rawPrototype.eyebrow, "Try it live"),
      title: text(rawPrototype.title, "Interactive prototype"),
      description: text(
        rawPrototype.description,
        "A working prototype of the flow — click through the way a user would. Best experienced on desktop. Tap the expand icon for fullscreen.",
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
