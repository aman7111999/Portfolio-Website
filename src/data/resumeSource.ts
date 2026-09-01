export const RESUME_TAGLINE =
  "Product designer with 4.5+ years building fintech products at Motilal Oswal and Trinkerr.";

export const RESUME_PROFILE =
  "Product designer with 4.5+ years building fintech products at Motilal Oswal and Trinkerr. I enjoy turning complex investment journeys and dense information into experiences people can understand and act on. I work closely with product and engineering, from figuring out the problem to seeing the final experience go live.";

export const RESUME_HERO_SUBLINE =
  "I enjoy turning complex investment journeys and dense information into experiences people can understand and act on. I work closely with product and engineering, from figuring out the problem to seeing the final experience go live.";

export const RESUME_EXPERIENCE = [
  {
    id: "resume-motilal-oswal",
    role: "Assistant Manager, Product Design",
    company: "Motilal Oswal Financial Services",
    location: "Mumbai, India",
    start_date: "Aug 2025",
    end_date: null,
    description:
      "Designing Riise, Motilal Oswal's investment platform for 1.6 million active clients across Stocks, F&O, Mutual Funds, US Stocks, Algo, AIF and PMS.",
    highlights: [
      "Portfolio Analysis: Helped users see what their portfolio is doing, not just what it holds, with clearer insights into portfolio health, risk, diversification and what to do next. 4,89,069 unique users used the feature in the last six months, with 70% returning more than once.",
      "Portfolio Revamp: Improved the UX and UI of the existing multi-product portfolio, reducing repeated information and making it easier to understand what users own, how it is performing, where it is invested and what needs attention.",
      "First-Time User Journey: Designed a progress-led journey that shows new users what Riise offers and what comes next. Users can preview one research call before KYC, unlock all research calls after KYC, then get guided to add funds and place their first trade, moving them towards becoming active investors or traders on Riise.",
      "Hyperpersonalisation: Designed a personalised home experience that adapts to a user's activity, holdings and product preferences, making the first screen more relevant to how they actually use Riise.",
      "Research Assistant: Designing a research experience that helps investors search Motilal Oswal's research, find relevant insights and discover research calls from the Research Hub in one place.",
      "Design System: Worked closely with design and engineering to use the same component system across Figma and development, making the product more consistent and reducing gaps between design and what finally ships.",
    ],
    sort_order: 1,
    published: true,
  },
  {
    id: "resume-trinkerr",
    role: "Product Designer | Associate Product Designer",
    company: "Trinkerr",
    location: "Bengaluru, India",
    start_date: "Jan 2022",
    end_date: "Apr 2025",
    description:
      "Product Designer (Feb 2023 - Apr 2025), promoted from Associate Product Designer (Jan 2022 - Feb 2023). Worked across portfolio tools, investment discovery and the TIQS product.",
    highlights: [
      "Portfolio Health Report: Turned XIRR vs NIFTY 50, valuation, beta, allocation, concentration and risk into a report investors could actually understand. Portfolio imports increased 9x after launch.",
      "Feeds: Redesigned the market feed to make posts, discussions and investment ideas easier to discover and scan.",
      "TIQS Revamp & Design System: Revamped TIQS and helped build its design system with reusable components and patterns, improving consistency from design through development.",
      "Designed portfolio import, watchlist, portfolio tracking and transaction journeys across the mobile product.",
      "Used interviews, usability tests, product data and UI audits to understand where users struggled and improve the experience. Also mentored a design intern.",
    ],
    sort_order: 2,
    published: true,
  },
] as const;
