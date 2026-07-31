const stamp = "2026-07-31T00:00:00.000Z";

export const PORTFOLIO_SITE = {
  name: "Aman Mishra",
  tagline:
    "Senior Product Designer with 4.5+ years of experience across fintech, AI-assisted products, 0-to-1 launches, and design systems.",
  bio: "I’m a product designer with 4.5+ years of experience designing fintech and investment products across Motilal Oswal and Trinkerr.\n\nAt Motilal Oswal, I work across Riise’s hyper-personalised homepage, 0-to-1 stock discovery, and AI-assisted investing experiences. Previously at Trinkerr, I designed portfolio and advisory products and contributed to the TIQS design system across iOS and Android.\n\nMy work sits at the intersection of product strategy, interaction design, and systems thinking. I’m strongest when the problem is ambiguous, the information is dense, and the experience must balance user needs, business goals, and regulatory constraints.\n\nI work closely with product, engineering, research, and compliance from problem framing and prototyping through handoff, validation, and launch. I’m currently exploring Senior Product Designer opportunities across fintech, AI, consumer products, and complex digital platforms.",
  email: "aman755559@gmail.com",
  location: "Mumbai, India",
  profile_image_url: null,
  resume_url: "/Aman_Mishra_Senior_Product_Designer_Resume.pdf",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/amanmishra7" },
    { label: "Behance", url: "https://www.behance.net/aman-mishra7" },
  ],
};

export const PORTFOLIO_EXPERIENCE = [
  {
    id: "mofsl-assistant-manager",
    role: "Assistant Manager, Product Design",
    company: "Motilal Oswal Financial Services",
    location: "Mumbai, India",
    start_date: "Aug 2025",
    end_date: null,
    description:
      "Leading product design across high-impact Riise initiatives spanning homepage personalisation, stock discovery, AI-assisted investing, and scalable platform experiences.",
    highlights: [
      "Re-architected the Riise homepage to prioritise relevant financial products using behaviour, lifecycle, and portfolio signals.",
      "Led the 0-to-1 product definition of Screener, covering discovery, filters, comparison, saved workflows, and AI-assisted decisions.",
      "Shaping Mira AI as a unified layer across support, research, portfolio analysis, market briefs, and actionable recommendations.",
      "Partner with product, engineering, and compliance to move multiple complex workstreams from problem framing to implementation.",
    ],
    sort_order: 1,
    published: true,
    created_at: stamp,
    updated_at: stamp,
  },
  {
    id: "trinkerr-product-designer",
    role: "Product Designer",
    company: "Trinkerr",
    location: "Bengaluru, India",
    start_date: "Feb 2023",
    end_date: "Apr 2025",
    description:
      "Designed investing and advisory experiences for a SEBI-registered platform, with a focus on data storytelling, product adoption, and cross-platform consistency.",
    highlights: [
      "Turned portfolio import into an insight-led Portfolio Health Report, contributing to a 9× increase in imports after launch.",
      "Introduced a demo report that helped users understand the value before connecting a broker, contributing a further 1.2× lift.",
      "Designed actionable advisory formats covering entry, exit, and stop-loss information for clearer investment decisions.",
      "Contributed to TIQS 2.0, aligning tokens, components, accessibility, and design-engineering handoff across iOS and Android.",
    ],
    sort_order: 2,
    published: true,
    created_at: stamp,
    updated_at: stamp,
  },
  {
    id: "trinkerr-associate-product-designer",
    role: "Associate Product Designer",
    company: "Trinkerr",
    location: "Bengaluru, India",
    start_date: "Jan 2022",
    end_date: "Feb 2023",
    description:
      "Owned foundational investing experiences across portfolio tracking, watchlists, stock details, and transaction flows for mobile users.",
    highlights: [
      "Mapped complex investment information into clearer mobile flows and reusable interaction patterns.",
      "Used interviews, usability testing, and heuristic reviews to identify friction and guide iteration.",
      "Worked closely with product and engineering to maintain consistency across iOS and Android releases.",
    ],
    sort_order: 3,
    published: true,
    created_at: stamp,
    updated_at: stamp,
  },
];

export type PortfolioExperience = (typeof PORTFOLIO_EXPERIENCE)[number];

export const PORTFOLIO_EDUCATION = [
  {
    id: "masai-school",
    institution: "Masai School",
    degree: "Full Stack UI/UX Designer",
    field: "Product Design & Frontend Development",
    start_date: "Jun 2021",
    end_date: "Jan 2022",
    description: "Bengaluru, India",
    sort_order: 1,
    published: true,
    created_at: stamp,
    updated_at: stamp,
  },
  {
    id: "tcet",
    institution: "Thakur College of Engineering & Technology",
    degree: "Bachelor of Engineering",
    field: "Mechanical Engineering",
    start_date: "2018",
    end_date: "2022",
    description: "Mumbai, India",
    sort_order: 2,
    published: true,
    created_at: stamp,
    updated_at: stamp,
  },
];

export type PortfolioEducation = (typeof PORTFOLIO_EDUCATION)[number];

export const PORTFOLIO_SKILLS = [
  {
    group: "Product strategy",
    items: [
      "0-to-1 product design",
      "Problem framing",
      "Information architecture",
      "Product discovery",
      "Data-informed design",
      "Stakeholder alignment",
    ],
  },
  {
    group: "Research & execution",
    items: [
      "User interviews",
      "Usability testing",
      "Rapid prototyping",
      "Interaction design",
      "Visual design",
      "Developer handoff",
    ],
  },
  {
    group: "Fintech & systems",
    items: [
      "WealthTech",
      "Stock broking",
      "SEBI-aware UX",
      "Hyper-personalisation",
      "AI integration",
      "Design systems",
    ],
  },
  {
    group: "Tools",
    items: ["Figma", "Framer", "ProtoPie", "Figma AI", "After Effects", "Maze"],
  },
];

export const PORTFOLIO_CONTENT = {
  nav: {
    links: [
      { label: "Work", to: "/work" },
      { label: "About", to: "/about" },
      { label: "Résumé", to: "/resume" },
    ],
    cta_label: "Contact",
    cta_to: "/contact",
    role_line: "Senior Product Designer",
  },
  footer: { copyright_suffix: "All rights reserved", back_to_top_label: "Top" },
  hero: {
    available_label: "Open to Senior Product Designer opportunities",
    headline_before: "Making complex",
    headline_accent: "financial products",
    headline_after: "clear and trustworthy.",
    subline:
      "I’m Aman, a product designer with 4.5+ years across Motilal Oswal and Trinkerr. I lead 0-to-1 products, platform revamps, AI experiences, and design systems from problem framing through launch.",
    cta_label: "View selected work",
    cta_to: "/work",
    secondary_cta_label: "View résumé",
    secondary_cta_to: "/resume",
    brands: ["Fintech", "0-to-1 products", "AI-assisted UX", "Design systems"],
    tools: [
      { icon: "Figma", tint: "accent", pos: { top: "6%", left: "-14%" } },
      { icon: "Diamond", tint: "text", pos: { top: "18%", right: "-14%" } },
      { icon: "Shield", tint: "text", pos: { top: "48%", right: "-18%" } },
      { icon: "Framer", tint: "accent", pos: { top: "56%", left: "-16%" } },
      { icon: "PenTool", tint: "text", pos: { bottom: "12%", left: "-8%" } },
    ],
    badge_text: "FINTECH • AI • PRODUCT SYSTEMS •",
  },
  home_featured: {
    eyebrow: "Selected work",
    heading_line1: "Complex problems. Clear decisions.",
    heading_line2: "Evidence over decoration.",
    view_all_label: "View all projects",
    view_all_to: "/work",
  },
  home_experience: {
    eyebrow: "Experience",
    heading_line1: "4.5+ years simplifying",
    heading_line2: "complex financial products.",
  },
  home_stats: {
    eyebrow: "About",
    heading_line1: "From 0-to-1 launches",
    heading_accent: "to systems at scale",
    items: [
      { v: "4.5+", l: "Years in product design" },
      { v: "9×", l: "Portfolio import growth" },
      { v: "4", l: "Focused case studies" },
    ],
    body: "I’m {name}, a product designer focused on fintech, AI-assisted experiences, and scalable product systems. I turn dense workflows and ambiguous requirements into clear journeys that users can understand and teams can ship.",
    quote: "The strongest design decisions make complexity feel inevitable, not visible.",
  },
  home_faq: {
    eyebrow: "Working together",
    heading_line1: "How I",
    heading_accent: "work",
    heading_line2: "on complex products",
    subline:
      "A concise view of the ownership and collaboration I bring to a senior product-design role.",
    items: [
      {
        q: "What problems do you work best on?",
        a: "Complex B2C products where information is dense, the problem is ambiguous, and design must balance user needs, business goals, technical constraints, and compliance.",
      },
      {
        q: "What does end-to-end ownership mean in your work?",
        a: "I contribute from problem framing and product discovery through information architecture, prototyping, validation, visual design, handoff, implementation reviews, and post-launch iteration.",
      },
      {
        q: "How do you collaborate with product and engineering?",
        a: "I align early on the problem, constraints, and success criteria; make trade-offs visible; prototype decisions quickly; and stay involved through development so the shipped experience retains its intent.",
      },
      {
        q: "What roles are you exploring?",
        a: "Senior Product Designer opportunities across fintech, AI, consumer products, and platform experiences where I can own meaningful product areas and help raise the quality bar.",
      },
    ],
  },
  home_cta: {
    heading_line1: "Let’s make",
    heading_accent: "complexity",
    heading_line2: "feel simple.",
    subline:
      "I’m exploring Senior Product Designer opportunities across fintech, AI, and product platforms. If you’re building something complex and meaningful, I’d love to hear about it.",
    cta_label: "Email me",
  },
  about_hero: {
    badge: "About Aman",
    heading_before: "I turn complex product problems into",
    heading_accent: "clear, scalable",
    heading_after: "experiences.",
    meta: [
      { k: "Based in", v: "Mumbai, India" },
      { k: "Experience", v: "4.5+ years" },
      { k: "Focus", v: "Fintech · AI · Systems" },
      { k: "Currently", v: "Open to senior roles" },
    ],
    bio_eyebrow: "My approach",
    say_hello: "Email",
  },
  about_timeline: {
    badge: "Career timeline",
    heading: "Growing from execution to product ownership.",
    subline:
      "A progression across foundational investing journeys, measurable product outcomes, 0-to-1 launches, and platform-level design.",
  },
  about_experience: {
    badge: "Experience",
    heading: "The products and teams I’ve helped move forward.",
    subline: "Open each role to see the scope, decisions, and outcomes I owned or influenced.",
  },
  about_education: {
    badge: "Education",
    heading: "A technical foundation, redirected into product design.",
  },
  about_tools: { badge: "Capabilities", heading: "Strategy, craft, research, and systems." },
  about_philosophy: {
    badge: "Design principles",
    heading: "Four principles I use when the answer is not obvious.",
    items: [
      {
        k: "Clarity before novelty",
        v: "A distinctive interface still needs to make the next decision obvious.",
      },
      {
        k: "Evidence before preference",
        v: "Research, product data, constraints, and user behaviour should shape the direction.",
      },
      {
        k: "Systems before isolated screens",
        v: "Reusable patterns make both the experience and the team more consistent.",
      },
      {
        k: "Shipping is part of design",
        v: "I stay close to engineering through implementation, QA, and iteration.",
      },
    ],
  },
  about_working_style: {
    badge: "Working style",
    heading: "How I move work from ambiguity to release.",
    items: [
      {
        k: "Frame the problem",
        v: "Align on the user, business goal, constraints, assumptions, and success signals before polishing screens.",
      },
      {
        k: "Prototype the decision",
        v: "Use the smallest useful prototype to expose gaps, compare directions, and build alignment.",
      },
      {
        k: "Make trade-offs visible",
        v: "Document what changed, why it changed, and what the team is deliberately not solving yet.",
      },
      {
        k: "Stay through implementation",
        v: "Review builds with engineering and protect the intent without ignoring technical reality.",
      },
    ],
  },
  about_books: { items: [] },
  about_values: {
    badge: "What I bring",
    heading: "The qualities behind the output.",
    items: [
      { k: "Ownership", v: "I stay accountable for the outcome, not only the design file." },
      { k: "Clarity", v: "I make decisions and their reasoning easy for teams to understand." },
      { k: "Curiosity", v: "I keep testing assumptions until the real problem becomes visible." },
      { k: "Craft", v: "I care about the details because they shape trust in the product." },
    ],
  },
  about_fun_facts: { items: [] },
  contact_page: {
    eyebrow: "Start a conversation",
    heading_before: "Let’s simplify",
    heading_accent: "something complex",
    heading_after: ".",
    copy_email_label: "Copy email",
    copied_label: "Copied",
    form_labels: {
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sending: "Sending",
    },
    success_toast: "Message sent — I’ll get back to you soon.",
    elsewhere_label: "Elsewhere",
    based_in_label: "Based in",
  },
  resume_page: {
    eyebrow: "Résumé",
    heading: "4.5+ years across fintech products, AI, and design systems.",
    subline:
      "A concise view of my product scope, progression, and core capabilities. Download the PDF for applications and recruiter conversations.",
    download_label: "Download résumé",
    experience_heading: "Experience",
    education_heading: "Education",
    skills_heading: "Capabilities",
  },
};

export const PORTFOLIO_PROJECTS = [
  {
    id: "riise-personalisation",
    title: "Riise Hyper-personalisation",
    slug: "riise-hyper-personalisation",
    short_description:
      "Re-architecting a complex investment homepage around behaviour, lifecycle stage, and portfolio activity.",
    overview:
      "<p>Riise brings together Stocks, F&amp;O, Mutual Funds, US Stocks, and Algo Trading in one investment platform. As the product expanded, its homepage became a dense collection of entry points competing for attention.</p><p>As Assistant Manager, Product Design, I lead design across the homepage revamp and related personalisation initiatives. My scope includes problem framing, information architecture, interaction models, high-fidelity design, stakeholder alignment, and implementation review.</p><p>This is current product work. Confidential screens and internal data are intentionally omitted; the case study focuses on the product decisions and reusable framework.</p>",
    problem_statement:
      "<p>The homepage treated every product as equally important for every user. A first-time investor, an active trader, and a mutual-fund customer saw similar prominence across modules, increasing cognitive load and weakening discoverability.</p><ul><li>Too many products competed above the fold.</li><li>Static ordering ignored user behaviour and lifecycle.</li><li>New capabilities were repeatedly added without a scalable hierarchy.</li><li>Multiple teams needed a shared framework for deciding what appears, when, and why.</li></ul>",
    research:
      "<p>I audited the existing homepage, mapped entry points and dependencies, reviewed available behaviour and portfolio signals, and worked with product stakeholders across business lines.</p><p>The key insight was that personalisation was not only a recommendation problem. It was an information-architecture problem: the platform needed stable rules for relevance, priority, continuity, and discovery.</p>",
    design_process:
      "<p>I reframed the homepage as a system of prioritised zones rather than a fixed sequence of cards.</p><ol><li>Mapped user states across new, returning, invested, and active cohorts.</li><li>Separated persistent utilities from behaviour-led modules and discovery content.</li><li>Defined prioritisation rules using recent activity, holdings, lifecycle, and product eligibility.</li><li>Created responsive templates so teams could add modules without breaking the hierarchy.</li><li>Reviewed states with product, engineering, and compliance before high-fidelity handoff.</li></ol>",
    solution:
      "<p>The proposed architecture gives each user a clearer starting point while preserving access to the wider product ecosystem.</p><ul><li>A contextual top section for the user’s most relevant tasks and holdings.</li><li>Behaviour-led continuation modules that help users resume meaningful activity.</li><li>Lifecycle-aware discovery for products the user has not yet adopted.</li><li>Reusable module rules and component patterns for scalable future additions.</li><li>Dedicated new-user states that build understanding before promoting advanced products.</li></ul>",
    outcome:
      "<p>The work created a shared personalisation framework across multiple product teams and shifted the conversation from adding homepage cards to managing relevance. It reduced structural ambiguity for design and engineering and established a scalable direction for implementation.</p><p>Because this work is current, outcome claims are limited to what can be stated honestly without exposing internal performance data.</p>",
    learnings:
      "<p>Personalisation fails when it becomes a collection of isolated recommendations. The stronger approach is to define a coherent hierarchy first, then use signals to adapt it. Senior design ownership here meant making product rules, dependencies, and trade-offs visible—not only producing the final UI.</p>",
    role: "Lead product design · Product strategy · Information architecture",
    duration: "Current product work",
    company: "Motilal Oswal Financial Services",
    tools: ["Figma", "Prototyping", "Design system"],
    tags: ["Fintech", "Personalisation", "Platform", "Product strategy"],
    category: "Platform redesign",
    timeline: "2025–Present",
    thumbnail_url: null,
    gallery: [],
    links: [],
    metrics: [
      {
        value: "5",
        label: "Financial product lines",
        hint: "Stocks, F&O, Mutual Funds, US Stocks, and Algo Trading",
      },
      {
        value: "System",
        label: "Personalisation framework",
        hint: "Rules for priority, continuity, and discovery",
      },
      { value: "E2E", label: "Design ownership", hint: "Framing through implementation review" },
    ],
    featured: true,
    published: true,
    sort_order: 1,
    created_at: stamp,
    updated_at: stamp,
  },
  {
    id: "screener",
    title: "Screener — 0-to-1 Stock Discovery",
    slug: "screener-stock-discovery",
    short_description:
      "Defining a new stock-discovery product across filtering, comparison, saved workflows, and AI-assisted decisions.",
    overview:
      "<p>Riise needed a structured way for investors to discover stocks beyond search, tips, and isolated research content. Screener was defined as a new product line rather than a single filter screen.</p><p>I led the experience from early architecture through interaction design and developer handoff, working with product and engineering to balance beginner accessibility with the depth expected by experienced investors.</p>",
    problem_statement:
      "<p>Stock discovery tools often force a trade-off: simple experiences lack depth, while advanced screeners overwhelm less experienced users. The product also needed to support repeated workflows, comparison, and a clear path from discovery to decision.</p><ul><li>Users needed meaningful starting points instead of an empty filter builder.</li><li>Beginner and advanced workflows required different levels of control.</li><li>Comparison needed to explain differences, not only display more numbers.</li><li>Saved screeners needed to be easy to duplicate, edit, and reuse.</li></ul>",
    research:
      "<p>I reviewed existing research and discovery journeys, audited common screener patterns, mapped the financial attributes available in the platform, and worked with product stakeholders to define the minimum useful 0-to-1 scope.</p><p>The opportunity was to treat filters as reusable investment questions: value stocks, momentum opportunities, dividend candidates, sector leaders, and other recognisable goals.</p>",
    design_process:
      "<p>The architecture was developed around two complementary entry points.</p><ol><li>Curated and trending screeners for faster discovery.</li><li>A guided builder for users who want to create their own criteria.</li><li>Easy and advanced modes to progressively expose complexity.</li><li>Comparison patterns that combine key ratios, visual hierarchy, and an AI-assisted verdict.</li><li>Saved workflows with duplicate and edit actions for repeat use.</li></ol><p>I used prototypes to test hierarchy, edge cases, and the transition from discovery to comparison before finalising the component model.</p>",
    solution:
      "<p>The resulting product system supports exploration without hiding expert capability.</p><ul><li>Category-led landing page with trending and ready-made screeners.</li><li>Progressive filter builder with clear active criteria and result feedback.</li><li>Stock comparison that highlights meaningful differences before showing full data.</li><li>AI-assisted explanation designed as decision support, not a substitute for judgement.</li><li>Reusable saved screeners that users can revisit, duplicate, and refine.</li></ul>",
    outcome:
      "<p>The work established the foundational experience and reusable architecture for a new product line. It aligned product and engineering around a shared scope, clarified the novice-to-advanced progression, and produced a build-ready interaction model.</p><p>No adoption or conversion figures are claimed because verified post-launch data is not yet available for publication.</p>",
    learnings:
      "<p>The strongest way to simplify an advanced tool is not to remove capability. It is to provide meaningful starting points, reveal complexity progressively, and make every added control explain its effect.</p>",
    role: "0-to-1 product design · IA · Interaction design",
    duration: "Concept to developer handoff",
    company: "Motilal Oswal Financial Services",
    tools: ["Figma", "Interactive prototypes", "Design system"],
    tags: ["Fintech", "0-to-1", "Discovery", "AI-assisted UX"],
    category: "0-to-1 product",
    timeline: "2026",
    thumbnail_url: null,
    gallery: [],
    links: [],
    metrics: [
      { value: "0→1", label: "Product definition", hint: "From architecture to developer handoff" },
      {
        value: "2",
        label: "Discovery entry points",
        hint: "Curated screeners and custom creation",
      },
      {
        value: "Easy + Advanced",
        label: "Progressive complexity",
        hint: "One product for different confidence levels",
      },
    ],
    featured: true,
    published: true,
    sort_order: 2,
    created_at: stamp,
    updated_at: stamp,
  },
  {
    id: "portfolio-health-report",
    title: "Portfolio Health Report",
    slug: "portfolio-health-report",
    short_description:
      "Turning a low-value portfolio-import flow into an insight-led experience that gave users a reason to connect their investments.",
    overview:
      "<p>Trinkerr allowed users to import a portfolio, but the feature offered limited value after connection—especially for users with a single broker. Importing financial data required trust and effort, while the immediate benefit was unclear.</p><p>I redesigned the experience around a Portfolio Health Report: a clear, actionable view of performance, valuation, risk, allocation, and portfolio red flags.</p>",
    problem_statement:
      "<p>The original flow optimised the act of importing rather than the reason to import.</p><ul><li>Users could already view holdings in their broker app.</li><li>Connecting a broker introduced trust and privacy concerns.</li><li>The product did not preview the value users would receive.</li><li>Complex financial metrics risked becoming a dense data dump.</li></ul><p>The business goal was to improve portfolio imports; the user goal was to understand whether their portfolio was healthy and what deserved attention.</p>",
    research:
      "<p>I mapped the existing journey, reviewed user friction around broker connection, and worked with product stakeholders to identify the insights that could make an imported portfolio meaningfully different from a holdings list.</p><p>The central insight was that users did not need more numbers. They needed comparisons, interpretation, and prioritisation: Am I outperforming? Am I overvalued? Is risk concentrated? Which holdings need attention?</p>",
    design_process:
      "<p>I organised the report around a sequence of investor questions rather than internal data categories.</p><ol><li>Performance: XIRR compared with NIFTY 50.</li><li>Valuation: PE, PB, and PEG in market context.</li><li>Risk: beta explained through an approachable visual.</li><li>Allocation: stocks, sectors, and market-cap views with balanced versus concentrated interpretation.</li><li>Attention: a red-flag summary that leads users to the affected holdings.</li></ol><p>Broker pills let users view individual portfolios or a combined picture. Progressive disclosure kept the overview scannable while allowing deeper inspection.</p>",
    solution:
      "<p>The redesigned experience connected import directly to a valuable outcome.</p><ul><li>An insight-led health report immediately after portfolio connection.</li><li>Benchmarks and interpretation beside financial metrics.</li><li>Allocation views that explain concentration rather than only showing a chart.</li><li>Red flags framed as prioritised areas to investigate.</li><li>A demo health report that previews the value before users connect a broker.</li></ul>",
    outcome:
      "<p>The Portfolio Health Report contributed to a 9× increase in portfolio imports after launch. Introducing the demo report—so users could understand the value before connecting a broker—contributed a further 1.2× lift.</p><p>The project demonstrated that adoption improved when the experience made the promised outcome visible before asking users for effort and trust.</p>",
    learnings:
      "<p>The initial instinct was to optimise the import flow. The more important product decision was to improve the value proposition after import. Showing a credible preview reduced uncertainty more effectively than adding more persuasion to the connection step.</p>",
    role: "End-to-end product design · Data storytelling · Adoption",
    duration: "Discovery through post-launch iteration",
    company: "Trinkerr",
    tools: ["Figma", "Prototyping", "Usability testing"],
    tags: ["Fintech", "Portfolio", "Data visualisation", "Growth"],
    category: "Growth & insights",
    timeline: "2023–2024",
    thumbnail_url: null,
    gallery: [],
    links: [],
    metrics: [
      {
        value: "9×",
        label: "Increase in portfolio imports",
        hint: "After launching the insight-led report",
      },
      { value: "1.2×", label: "Further lift", hint: "After adding a demo report" },
      {
        value: "5",
        label: "Insight areas",
        hint: "Performance, valuation, risk, allocation, and red flags",
      },
    ],
    featured: true,
    published: true,
    sort_order: 3,
    created_at: stamp,
    updated_at: stamp,
  },
  {
    id: "tiqs-design-system",
    title: "TIQS 2.0 Design System",
    slug: "tiqs-design-system",
    short_description:
      "Creating reusable foundations across mobile platforms to improve consistency and design-engineering alignment.",
    overview:
      "<p>As Trinkerr and TIQS expanded, screens created by multiple designers began to diverge in spacing, components, states, naming, and behaviour. The inconsistency affected both product quality and handoff efficiency.</p><p>I contributed to TIQS 2.0 as a cross-platform design-system initiative covering foundations, reusable components, documentation, accessibility, and alignment with development.</p>",
    problem_statement:
      "<p>The system had grown reactively around individual features.</p><ul><li>Similar patterns existed as separate components.</li><li>Light and dark themes were difficult to maintain consistently.</li><li>Naming differences made components harder to discover and map to code.</li><li>States, accessibility guidance, and usage rules were not consistently documented.</li><li>Design and Storybook could drift during handoff.</li></ul>",
    research:
      "<p>We audited repeated patterns across core investing journeys, grouped inconsistencies by foundation and component, and prioritised the areas creating the most rework for design and engineering.</p><p>The audit showed that the problem was not a lack of components. It was a lack of shared rules for when to reuse, extend, or create one.</p>",
    design_process:
      "<p>The system was approached as a product rather than a one-time library clean-up.</p><ol><li>Defined colour, typography, spacing, elevation, and semantic state foundations.</li><li>Adopted reusable component properties instead of duplicating components for every variation.</li><li>Aligned light and dark themes through shared tokens and variables.</li><li>Standardised naming to improve discoverability and code mapping.</li><li>Documented anatomy, states, accessibility, content guidance, and usage boundaries.</li><li>Reviewed implementation with developers and compared Figma patterns with Storybook.</li></ol>",
    solution:
      "<p>TIQS 2.0 provided a clearer shared language across product surfaces.</p><ul><li>Tokenised foundations for theme-aware design.</li><li>Reusable components with structured variants and properties.</li><li>Touch targets, contrast, disabled states, and interaction guidance.</li><li>Consistent iconography and numerical typography for fintech data.</li><li>Documentation and handoff patterns designed for asynchronous collaboration.</li></ul>",
    outcome:
      "<p>The system reduced avoidable inconsistency, made component decisions easier to review, and improved the shared understanding between design and engineering. It also created a stronger base for scaling new product modules without recreating common patterns.</p><p>No percentage reduction is presented because a verified measurement source is not available for publication.</p>",
    learnings:
      "<p>A design system scales through governance and adoption, not the size of its library. Component properties, naming, documentation, and code alignment often create more value than adding another set of polished variants.</p>",
    role: "Design systems · Cross-platform UX · Documentation",
    duration: "System audit through adoption",
    company: "Trinkerr / TIQS",
    tools: ["Figma variables", "Component properties", "Storybook"],
    tags: ["Design systems", "Fintech", "iOS", "Android"],
    category: "Design system",
    timeline: "2023–2025",
    thumbnail_url: null,
    gallery: [],
    links: [],
    metrics: [
      { value: "2", label: "Platform themes", hint: "Shared light and dark foundations" },
      {
        value: "iOS + Android",
        label: "Cross-platform scope",
        hint: "Reusable patterns across mobile products",
      },
      {
        value: "System",
        label: "Design-to-code alignment",
        hint: "Naming, documentation, and Storybook reviews",
      },
    ],
    featured: true,
    published: true,
    sort_order: 4,
    created_at: stamp,
    updated_at: stamp,
  },
];
