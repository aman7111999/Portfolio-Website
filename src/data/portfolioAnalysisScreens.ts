export type PortfolioAnalysisScreenTheme = "light" | "dark" | "mixed";

export type PortfolioAnalysisScreen = {
  id: string;
  title: string;
  description: string;
  url: string;
  alt: string;
  theme: PortfolioAnalysisScreenTheme;
};

export type PortfolioAnalysisScenario = {
  id: string;
  tabLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  screens: PortfolioAnalysisScreen[];
};

const FLOW_ROOT = "/projects/portfolio-analysis/flows";

export const PORTFOLIO_ANALYSIS_SCENARIOS: PortfolioAnalysisScenario[] = [
  {
    id: "mo-stocks",
    tabLabel: "MO stocks",
    eyebrow: "Motilal Oswal · Stocks",
    title: "See the internal stock portfolio, then open the risk behind it.",
    description:
      "The overview brings performance, portfolio signals, and the affected holdings into one path. Users can move from a warning to the exact allocation that needs attention.",
    screens: [
      {
        id: "mo-stocks-overview",
        title: "MO stock portfolio",
        description: "The complete internal stock-analysis flow.",
        url: `${FLOW_ROOT}/mo-stocks-overview.webp`,
        alt: "Complete Motilal Oswal stock portfolio analysis flow",
        theme: "light",
      },
      {
        id: "mo-stocks-risk",
        title: "Portfolio risk",
        description: "A focused view of market-cap exposure and the suggested next step.",
        url: `${FLOW_ROOT}/mo-stocks-risk.webp`,
        alt: "Motilal Oswal stock portfolio risk screen",
        theme: "light",
      },
    ],
  },
  {
    id: "external-stocks",
    tabLabel: "External stocks",
    eyebrow: "Linked portfolio · Stocks",
    title: "Make an imported stock portfolio feel native, explainable, and actionable.",
    description:
      "External holdings keep their source visible while using the same analysis language as the MO portfolio. Light and dark states cover the core flow, MO research, and diversification options.",
    screens: [
      {
        id: "external-stocks-light",
        title: "External stock flow · Light",
        description: "The complete linked-stock analysis journey in light theme.",
        url: `${FLOW_ROOT}/external-stocks-overview-light.webp`,
        alt: "Complete external stock portfolio analysis flow in light theme",
        theme: "light",
      },
      {
        id: "external-stocks-dark",
        title: "External stock flow · Dark",
        description: "The same linked-stock journey in dark theme.",
        url: `${FLOW_ROOT}/external-stocks-overview-dark.webp`,
        alt: "Complete external stock portfolio analysis flow in dark theme",
        theme: "dark",
      },
      {
        id: "analysis-by-mo-light",
        title: "Analysis by MO · Light",
        description: "MO research is brought into the imported portfolio without losing context.",
        url: `${FLOW_ROOT}/external-stocks-analysis-by-mo-light.webp`,
        alt: "Motilal Oswal research analysis for external stocks in light theme",
        theme: "light",
      },
      {
        id: "analysis-by-mo-dark",
        title: "Analysis by MO · Dark",
        description: "The research-led stock view in dark theme.",
        url: `${FLOW_ROOT}/external-stocks-analysis-by-mo-dark.webp`,
        alt: "Motilal Oswal research analysis for external stocks in dark theme",
        theme: "dark",
      },
      {
        id: "diversification-light",
        title: "Diversification options · Light",
        description: "Research-backed ways to balance the portfolio.",
        url: `${FLOW_ROOT}/external-stocks-diversification-light.webp`,
        alt: "External stock diversification options in light theme",
        theme: "light",
      },
      {
        id: "diversification-dark",
        title: "Diversification options · Dark",
        description: "The same diversification path in dark theme.",
        url: `${FLOW_ROOT}/external-stocks-diversification-dark.webp`,
        alt: "External stock diversification options in dark theme",
        theme: "dark",
      },
    ],
  },
  {
    id: "mo-mutual-funds",
    tabLabel: "MO mutual funds",
    eyebrow: "Motilal Oswal · Mutual funds",
    title: "Translate fund performance and concentration into a clear diagnosis.",
    description:
      "The mutual-fund flow prioritises the risks that matter, connects them to the affected funds, and supports both light and dark product themes.",
    screens: [
      {
        id: "mo-mf-light",
        title: "MO mutual funds · Light",
        description: "The complete internal mutual-fund analysis flow in light theme.",
        url: `${FLOW_ROOT}/mo-mutual-funds-overview-light.webp`,
        alt: "Complete Motilal Oswal mutual-fund portfolio analysis in light theme",
        theme: "light",
      },
      {
        id: "mo-mf-dark-a",
        title: "MO mutual funds · Dark 01",
        description: "The first complete dark-theme route through the mutual-fund analysis.",
        url: `${FLOW_ROOT}/mo-mutual-funds-overview-dark-a.webp`,
        alt: "Motilal Oswal mutual-fund portfolio analysis dark-theme flow one",
        theme: "dark",
      },
      {
        id: "mo-mf-dark-b",
        title: "MO mutual funds · Dark 02",
        description: "An alternate dark-theme route covering the supplied fund states.",
        url: `${FLOW_ROOT}/mo-mutual-funds-overview-dark-b.webp`,
        alt: "Motilal Oswal mutual-fund portfolio analysis dark-theme flow two",
        theme: "dark",
      },
    ],
  },
  {
    id: "external-mutual-funds",
    tabLabel: "External mutual funds",
    eyebrow: "Linked portfolio · Mutual funds",
    title: "Analyse externally held funds without making users learn a second system.",
    description:
      "The linked-fund view preserves the external source while retaining the same hierarchy for warnings, performance, concentration, and recommended next steps.",
    screens: [
      {
        id: "external-mf-light",
        title: "External mutual-fund flow",
        description: "The complete external mutual-fund analysis journey.",
        url: `${FLOW_ROOT}/external-mutual-funds-overview-light.webp`,
        alt: "Complete external mutual-fund portfolio analysis flow",
        theme: "light",
      },
    ],
  },
  {
    id: "risk-states",
    tabLabel: "Risk states",
    eyebrow: "Shared details · Mutual funds",
    title: "Carry the diagnosis into the details, drawers, and expanded states.",
    description:
      "These supporting screens show how underperformance and concentration risks behave across light, dark, collapsed, expanded, and breakdown states.",
    screens: [
      {
        id: "mf-underperforming-light",
        title: "Underperforming funds · Light",
        description: "Fund performance with the ranked-fund action visible.",
        url: `${FLOW_ROOT}/mutual-fund-risk-underperforming-light.webp`,
        alt: "Underperforming mutual funds risk screen in light theme",
        theme: "light",
      },
      {
        id: "mf-underperforming-light-drawer",
        title: "Underperformance drawer · Light",
        description: "The risk selector expanded over the light-theme screen.",
        url: `${FLOW_ROOT}/mutual-fund-risk-underperforming-light-drawer.webp`,
        alt: "Expanded mutual-fund risk selector in light theme",
        theme: "light",
      },
      {
        id: "mf-concentration-light",
        title: "Fund concentration · Light",
        description: "The concentration diagnosis with affected-fund distribution.",
        url: `${FLOW_ROOT}/mutual-fund-risk-concentration-light.webp`,
        alt: "Mutual-fund concentration risk screen in light theme",
        theme: "light",
      },
      {
        id: "mf-underperforming-dark",
        title: "Underperforming funds · Dark",
        description: "The same underperformance diagnosis in dark theme.",
        url: `${FLOW_ROOT}/mutual-fund-risk-underperforming-dark.webp`,
        alt: "Underperforming mutual funds risk screen in dark theme",
        theme: "dark",
      },
      {
        id: "mf-underperforming-dark-drawer",
        title: "Underperformance drawer · Dark",
        description: "The expanded risk selector in dark theme.",
        url: `${FLOW_ROOT}/mutual-fund-risk-underperforming-dark-drawer.webp`,
        alt: "Expanded mutual-fund risk selector in dark theme",
        theme: "dark",
      },
      {
        id: "mf-concentration-breakdown",
        title: "Concentration breakdown",
        description: "The complete holding-level breakdown inside the bottom sheet.",
        url: `${FLOW_ROOT}/mutual-fund-risk-concentration-breakdown.webp`,
        alt: "Expanded portfolio concentration breakdown sheet",
        theme: "light",
      },
    ],
  },
];

export const PORTFOLIO_ANALYSIS_SCREEN_COUNT = PORTFOLIO_ANALYSIS_SCENARIOS.reduce(
  (total, scenario) => total + scenario.screens.length,
  0,
);

export const PORTFOLIO_ANALYSIS_HERO_SCREENS = {
  moStocks: "/projects/portfolio-analysis/hero/mo-stocks.webp",
  externalStocks: "/projects/portfolio-analysis/hero/external-stocks.webp",
  moMutualFunds: "/projects/portfolio-analysis/hero/mo-mutual-funds-dark.webp",
  externalMutualFunds: "/projects/portfolio-analysis/hero/external-mutual-funds.webp",
} as const;
