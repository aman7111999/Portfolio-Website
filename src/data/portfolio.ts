const stamp = "2026-07-31T00:00:00.000Z";

export const PORTFOLIO_SITE = {
  name: "Aman Mishra",
  tagline:
    "Senior Product Designer with 4.5+ years designing investment products, AI-assisted tools, and design systems at Motilal Oswal and Trinkerr.",
  bio: "I’m a product designer with 4.5+ years of experience designing fintech and investment products across Motilal Oswal and Trinkerr.\n\nAt Motilal Oswal, I work across Riise’s hyper-personalised homepage, 0-to-1 stock discovery, and AI-assisted investing experiences. Previously at Trinkerr, I designed portfolio and advisory products and contributed to the TIQS design system across iOS and Android.\n\nI’m usually working on problems with a lot of information, an unclear starting point, and constraints that cannot be designed away. I like finding the structure that helps the user decide what to do next.\n\nI stay close to product, engineering, research, and compliance from the first sketch through the shipped build. I’m currently looking for a Senior Product Designer role in fintech, AI, or another product with genuinely complicated workflows.",
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
      "At Motilal Oswal, I design Riise’s homepage personalisation, stock discovery, AI-assisted investing, and portfolio experiences.",
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
      "At Trinkerr, I designed portfolio and advisory products for a SEBI-registered platform across iOS and Android.",
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
      "I worked on the everyday investing flows: portfolios, watchlists, stock details, and transactions on mobile.",
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
      { label: "Home", to: "/" },
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
    expertise_label: "UX expertise",
    expertise: [
      "0→1 product strategy",
      "UX research",
      "Information architecture",
      "Interaction & visual design",
      "Prototyping & validation",
      "Design systems",
      "Complex financial workflows",
    ],
    portrait_role: "Senior product designer",
    portrait_scope: "Research → launch",
    tools: [
      { icon: "Figma", tint: "accent", pos: { top: "6%", left: "-14%" } },
      { icon: "Diamond", tint: "text", pos: { top: "18%", right: "-14%" } },
      { icon: "Shield", tint: "text", pos: { top: "48%", right: "-18%" } },
      { icon: "Framer", tint: "accent", pos: { top: "56%", left: "-16%" } },
      { icon: "PenTool", tint: "text", pos: { bottom: "12%", left: "-8%" } },
    ],
    badge_text: "FINTECH • RESEARCH • INTERACTION •",
  },
  home_featured: {
    eyebrow: "Selected work",
    heading_line1: "A few problems I’ve",
    heading_line2: "enjoyed untangling.",
    view_all_label: "View all projects",
    view_all_to: "/work",
  },
  home_experience: {
    eyebrow: "Experience",
    heading_line1: "4.5+ years designing",
    heading_line2: "investment products.",
  },
  home_stats: {
    eyebrow: "About",
    heading_line1: "From first sketch",
    heading_accent: "to shipped product",
    items: [
      { v: "4.5+", l: "Years in product design" },
      { v: "9×", l: "Portfolio import growth" },
      { v: "5", l: "Focused case studies" },
    ],
    body: "Most of my work has been in investing products, where a screen can carry a lot of data and still needs to feel calm. I enjoy working through that mess with product and engineering until the next step feels obvious.",
    quote: "I enjoy the moment when a complicated flow finally feels obvious.",
  },
  home_faq: {
    eyebrow: "Working with me",
    heading_line1: "What it’s like",
    heading_accent: "working",
    heading_line2: "with me",
    subline: "The questions hiring managers usually ask, answered plainly.",
    items: [
      {
        q: "What problems do you work best on?",
        a: "I do my best work on products with dense information, unclear starting points, and real constraints. Investing products are a good example: the experience has to help the user, work for the business, and stay honest about risk.",
      },
      {
        q: "What does end-to-end ownership mean in your work?",
        a: "I stay with a problem from the first conversation through research, flows, prototypes, visual design, build reviews, and the changes that follow launch.",
      },
      {
        q: "How do you collaborate with product and engineering?",
        a: "I bring product and engineering in early, prototype the uncertain parts, and write down the trade-offs. During the build, I review the real product with the team instead of treating handoff as the finish line.",
      },
      {
        q: "What roles are you exploring?",
        a: "I’m looking for a Senior Product Designer role where I can own a meaningful product area. Fintech and AI are natural fits, but I’m also interested in consumer products with complicated workflows.",
      },
    ],
  },
  home_cta: {
    heading_line1: "Have a product",
    heading_accent: "problem",
    heading_line2: "worth talking through?",
    subline:
      "I’m open to Senior Product Designer roles. If the work involves fintech, AI, or a product with a lot of moving parts, I’d be glad to hear about it.",
    cta_label: "Email me",
  },
  about_hero: {
    badge: "About Aman",
    heading_before: "I design products that make",
    heading_accent: "dense information",
    heading_after: "easier to act on.",
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
    heading: "I started with screens. The work grew into systems and product decisions.",
    subline: "The roles, products, and decisions that shaped how I work today.",
  },
  about_experience: {
    badge: "Experience",
    heading: "What I worked on, and what changed.",
    subline: "Open a role for the products, responsibilities, and results behind it.",
  },
  about_education: {
    badge: "Education",
    heading: "A technical foundation, redirected into product design.",
  },
  about_tools: { badge: "Capabilities", heading: "The skills I use most often." },
  about_philosophy: {
    badge: "Design principles",
    heading: "Four habits I rely on when the answer is not obvious.",
    items: [
      {
        k: "Make the next step obvious",
        v: "A distinctive interface still needs to make the next decision obvious.",
      },
      {
        k: "Ask for evidence",
        v: "Research, product data, constraints, and user behaviour should shape the direction.",
      },
      {
        k: "Design beyond one screen",
        v: "Reusable patterns make both the experience and the team more consistent.",
      },
      {
        k: "Stay until it ships",
        v: "I stay close to engineering through implementation, QA, and iteration.",
      },
    ],
  },
  about_working_style: {
    badge: "Working style",
    heading: "How I work through an unclear product problem.",
    items: [
      {
        k: "Start with the problem",
        v: "Align on the user, business goal, constraints, assumptions, and success signals before polishing screens.",
      },
      {
        k: "Prototype early",
        v: "Use the smallest useful prototype to expose gaps, compare directions, and build alignment.",
      },
      {
        k: "Call out trade-offs",
        v: "Document what changed, why it changed, and what the team is deliberately not solving yet.",
      },
      {
        k: "Stay close to the build",
        v: "Review builds with engineering and protect the intent without ignoring technical reality.",
      },
    ],
  },
  about_books: { items: [] },
  about_values: {
    badge: "What I bring",
    heading: "What teammates can expect from me.",
    items: [
      {
        k: "Ownership",
        v: "I stay accountable for what ships and keep checking the work after handoff.",
      },
      { k: "Clarity", v: "I make decisions and their reasoning easy for teams to understand." },
      { k: "Curiosity", v: "I keep testing assumptions until the real problem becomes visible." },
      { k: "Craft", v: "I care about the details because they shape trust in the product." },
    ],
  },
  about_fun_facts: { items: [] },
  contact_page: {
    eyebrow: "Start a conversation",
    heading_before: "Tell me what",
    heading_accent: "you’re working on",
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
    success_toast: "Message sent. I’ll get back to you soon.",
    elsewhere_label: "Elsewhere",
    based_in_label: "Based in",
  },
  resume_page: {
    eyebrow: "Résumé",
    heading: "4.5+ years across fintech products, AI, and design systems.",
    subline:
      "The short version of my experience, projects, and skills. The PDF is ready for applications and recruiter conversations.",
    download_label: "Download résumé",
    experience_heading: "Experience",
    education_heading: "Education",
    skills_heading: "Capabilities",
  },
};

export const PORTFOLIO_PROJECTS = [
  {
    id: "portfolio-analysis",
    title: "Portfolio Analysis",
    slug: "portfolio-analysis",
    short_description:
      "Unifying internal and externally linked portfolios into one insight-to-action experience for clearer investment decisions.",
    overview:
      "<p>Investors rarely hold their complete wealth in one place. Their Motilal Oswal investments may be only one part of a portfolio spread across brokers, stocks, and mutual funds. The real need was a decision layer that could interpret the whole picture, not another list of holdings.</p><p>I designed Portfolio Analysis for Riise as a unified experience across <strong>internal Motilal Oswal holdings and externally imported portfolios</strong>. It brings portfolio health, risk, diversification, recommendations, and human advisory support into one continuous journey.</p><p>My role covered product framing, experience architecture, information hierarchy, interaction design, high-fidelity UI, edge states, and design-system-aligned handoff.</p>",
    problem_statement:
      "<p>Portfolio data was fragmented by source and difficult to translate into a confident next step. A user could see what they owned, but not necessarily what the combined portfolio meant.</p><ul><li>Internal and external investments created separate mental models.</li><li>Dense financial metrics could feel diagnostic without being understandable.</li><li>Stocks and mutual funds required different analysis while still belonging to one portfolio story.</li><li>Insights risked becoming dead ends if the product did not offer an appropriate action.</li><li>Import and syncing required clear consent, trust, progress, failure, and empty states.</li></ul><p>The product goal was to turn fragmented holdings into a coherent analysis that helps investors understand risk, identify gaps, and choose an informed next step.</p>",
    research:
      "<p>I audited the existing portfolio, import, stock-research, mutual-fund, and advisory journeys, then mapped the questions users need answered as they move from visibility to action.</p><p>Four questions kept coming up: <strong>completeness</strong> across brokers, <strong>interpretation</strong> of complex metrics, <strong>prioritisation</strong> of what deserves attention, and <strong>support</strong> at the moment a decision becomes consequential.</p><p>These inputs shaped a product principle: keep the data source visible, but never make the user learn a different analysis model for each source.</p>",
    design_process:
      "<p>I structured the experience around investor questions instead of backend data categories.</p><ol><li><strong>What is being analysed?</strong> Overall, Motilal Oswal, and External views preserve source context.</li><li><strong>Is my portfolio healthy?</strong> A concise overview surfaces allocation, risk, diversification, and attention areas.</li><li><strong>Why does it matter?</strong> Every metric is paired with interpretation and portfolio-specific context.</li><li><strong>Where is the issue?</strong> Progressive disclosure connects a diagnosis to the affected stocks or funds.</li><li><strong>What can I do next?</strong> IAP portfolios, RM support, and downloadable reports support different confidence levels.</li></ol><p>I also designed the non-ideal journey: no external portfolio, first-time connection, consent, syncing, partial data, errors, empty analysis, and light/dark states. This made the system buildable beyond the ideal happy path.</p>",
    solution:
      "<p>The final experience works as a connected six-part journey.</p><ul><li><strong>Entry and value framing:</strong> Portfolio Analysis communicates the benefit before asking users to connect more data.</li><li><strong>Unified portfolio scope:</strong> Overall, Motilal Oswal, and External tabs offer control without fragmenting the product.</li><li><strong>External portfolio connection:</strong> Consent-led broker import and visible syncing states reduce uncertainty.</li><li><strong>Stock diagnostics:</strong> Allocation, sector and stock concentration, portfolio risk, and red flags are organised by priority.</li><li><strong>Mutual-fund analysis:</strong> Risk alignment, diversification, and overlap are explained in an asset-appropriate format.</li><li><strong>Decision support:</strong> Relevant IAP mutual-fund portfolios, a relationship-manager conversation, and report download turn insight into an actionable choice.</li></ul><p>The interface uses progressive disclosure and plain-language interpretation to retain analytical depth without becoming a data dump.</p>",
    outcome:
      "<p>I designed one portfolio-analysis model for internal and external investments, covering <strong>2M+ portfolio-analysis use cases</strong>. It aligned the product around a continuous path from holdings to diagnosis to an appropriate next step.</p><p>The design system covers stocks, mutual funds, multiple portfolio sources, import states, light/dark themes, and advisory actions while keeping a consistent core interaction model.</p><p>The product is still confidential, so I am showing the scope, architecture, and build-ready journey rather than a conversion claim.</p>",
    learnings:
      "<p>A portfolio score alone creates attention, not confidence. The valuable design work is the layer between the number and the action: explaining why a signal matters, showing where it comes from, and offering help without pretending the interface can replace investor judgement.</p><p>The project also reinforced that source unification is an experience problem before it is a data problem. Users can accept multiple sources as long as the product gives them one stable mental model.</p>",
    role: "Lead product design · Product strategy · Data storytelling",
    duration: "Discovery to build-ready handoff",
    company: "Motilal Oswal Financial Services",
    tools: ["Figma", "Prototyping", "Design system"],
    tags: ["Fintech", "Portfolio intelligence", "Data visualisation", "Advisory UX"],
    category: "Portfolio intelligence",
    timeline: "2025–2026",
    thumbnail_url: null,
    gallery: [],
    links: [
      {
        label: "Figma source",
        url: "https://www.figma.com/design/xL2pjlUJRgR8NVAirSDS01/Important-Projects?node-id=1-3",
      },
    ],
    metrics: [
      {
        value: "2M+",
        label: "Portfolio-analysis use cases",
        hint: "Across internal and linked external investments",
      },
      {
        value: "2 sources",
        label: "One analysis model",
        hint: "Motilal Oswal and externally imported portfolios",
      },
      {
        value: "3 paths",
        label: "From insight to action",
        hint: "IAP portfolios, RM support, and report download",
      },
    ],
    featured: true,
    published: true,
    sort_order: 1,
    created_at: stamp,
    updated_at: stamp,
  },
  {
    id: "riise-portfolio-revamp",
    title: "RIISE Portfolio Revamp",
    slug: "riise-portfolio-revamp",
    short_description:
      "Reworking a crowded multi-product portfolio so people can understand value, performance, allocation, and risk without digging through repeated cards.",
    overview:
      "<p>RIISE brings many kinds of investments into one place: stocks, mutual funds, U.S. stocks, bonds, investment strategies, and more. That breadth is useful, but it also made the portfolio page carry too much at once.</p><p>The oldest experience worked, yet it felt dated and asked users to scan the same numbers across a long series of cards. When I joined Motilal Oswal, our first shared task was to build a stronger design system and bring it into RIISE, the company’s highest-revenue product.</p><p>That system gave the product a cleaner, more dependable visual language. It also gave us the confidence to go further: not just restyle the portfolio, but rethink how it should feel when many products live together.</p>",
    problem_statement:
      "<p>The page grew by adding one more card whenever a product was added. Over time, the portfolio became longer, louder, and harder to read.</p><ul><li>Total value, profit and loss, allocation, and product details competed for attention.</li><li>The same information repeated across multiple asset cards.</li><li>Users had to work to understand what mattered right now.</li><li>A visual refresh alone would not solve the underlying structure.</li></ul><p>The challenge was simple to say and difficult to solve: <strong>show more financial products while making the experience feel lighter.</strong></p>",
    research:
      "<p>I reviewed the existing journey screen by screen and compared it with leading wealth products. The most useful question was not “How do we make this prettier?” It was “What does someone need to understand in the first few seconds?”</p><ol><li>What is my portfolio worth?</li><li>How is it doing today?</li><li>Where is my money invested?</li><li>Is anything asking for attention?</li><li>How do I move into a specific asset?</li></ol><p>That simple sequence became the backbone of the revamp.</p>",
    design_process:
      "<p>The work moved through three deliberate stages.</p><ol><li><strong>Stabilise the foundation.</strong> We built and applied the RIISE design system across the older experience, bringing consistency to type, spacing, colour, components, and states.</li><li><strong>See past the polish.</strong> The system made the page feel more modern, but the same repeated-card structure was still doing too much work.</li><li><strong>Rebuild the reading order.</strong> I reorganised the portfolio around one clear summary, readable asset groups, and signals that help users notice what deserves attention.</li></ol><p>At each step, I checked how the page would behave as more products and states were added. The goal was not a perfect static screen. It was a structure that could keep growing without becoming heavy again.</p>",
    solution:
      "<p>The latest portfolio starts with the full picture, then lets users move into detail at their own pace.</p><ul><li><strong>One clear summary:</strong> current value, invested value, and profit or loss now read as one connected story.</li><li><strong>Choice without fragmentation:</strong> Overall, Motilal Oswal, and External views keep the source visible without splitting the experience.</li><li><strong>Assets as readable rows:</strong> stocks, mutual funds, U.S. stocks, IAP, and non-tradable holdings show allocation and performance without repeating an entire card.</li><li><strong>Attention before exploration:</strong> risk and performance signals point to what may need a closer look.</li><li><strong>Secondary value at the right depth:</strong> MTF borrowing, dividends, ideas, and other modules sit below the essential portfolio view.</li></ul><p>The data is still there, but it appears when it becomes useful.</p>",
    outcome:
      "<p>The latest experience can hold a wider product mix while feeling calmer and easier to scan. It gives the RIISE portfolio a visual and interaction standard that now stands alongside leading investment products.</p><p>The work also changed the internal conversation. We moved from applying a design system to using that system as a foundation for deeper product decisions. Instead of adding one more card, the team now had a clearer model for what belongs first, what can wait, and how new products should enter the portfolio.</p><p>This work is still being rolled out, so I am not attaching an uplift figure. The visible change is a clearer hierarchy, less repetition, and a structure that can take on new products.</p>",
    learnings:
      "<p>A design system can make a product consistent, but consistency alone does not make it simple. The real improvement came when we stopped treating every data point as equally urgent.</p><p>I learned that removing information was rarely the answer. Better hierarchy was.</p>",
    role: "Portfolio UX · Visual design · Design-system adoption",
    duration: "Design-system rollout to latest revamp",
    company: "Motilal Oswal Financial Services",
    tools: ["Figma", "Design system", "Prototyping"],
    tags: ["Fintech", "Portfolio", "UX revamp", "Visual design"],
    category: "Portfolio redesign",
    timeline: "2025–2026",
    thumbnail_url: "/projects/riise-portfolio-revamp/riise-latest-revamp.jpg",
    presentation: {
      type: "revamp_comparison",
      card: {
        style: "image",
        image_alt: "Latest RIISE multi-product portfolio revamp",
        eyebrow: "Revamp comparison",
      },
      hero: {
        style: "image",
        image_url: "/projects/riise-portfolio-revamp/riise-latest-revamp.jpg",
        image_alt: "Latest RIISE portfolio experience across multiple investment products",
      },
      comparison: {
        eyebrow: "Design evolution",
        title: "From stacked data to one clear portfolio story.",
        description:
          "The products stayed complex. The experience became easier to read at each stage, first through consistency and then through a deeper rethink of what users should see first.",
        stages: [
          {
            id: "oldest",
            label: "Oldest",
            title: "A working page without a clear point of view",
            timeframe: "Original experience",
            image_url: "/projects/riise-portfolio-revamp/riise-original.png",
            image_alt: "Original RIISE portfolio with repeated cards for each investment product",
            description:
              "Every product had its own card and repeated the same financial details. The experience worked, but reading it took effort and the visual language felt dated.",
            highlights: [
              "Repeated information across product cards",
              "Weak priority between essential and supporting data",
              "Every new product made the page longer",
            ],
          },
          {
            id: "systemised",
            label: "Systemised",
            title: "A stronger system, still carrying the old structure",
            timeframe: "Design-system rollout",
            image_url: "/projects/riise-portfolio-revamp/riise-design-system.jpg",
            image_alt: "RIISE portfolio after the new design system and UI improvements",
            description:
              "Applying the new RIISE design system improved type, spacing, colour, components, and trust. The page felt modern, but its content model still came from the older experience.",
            highlights: [
              "Consistent components and spacing",
              "Clearer readability and visual trust",
              "A stable foundation for deeper UX change",
            ],
          },
          {
            id: "revamped",
            label: "Revamped",
            title: "A calm view across every investment",
            timeframe: "Latest experience",
            image_url: "/projects/riise-portfolio-revamp/riise-latest-revamp.jpg",
            image_alt:
              "Latest RIISE portfolio revamp with a clear summary and structured asset list",
            description:
              "The latest page is organised around the questions users bring to a portfolio: what do I have, how is it doing, where is it invested, and what needs attention?",
            highlights: [
              "Priority information appears first",
              "Assets stay scannable without hiding detail",
              "Risk, allocation, and performance guide the next action",
            ],
          },
        ],
      },
      story: { enabled: false },
      gallery: {
        eyebrow: "Visual archive",
        title: "The portfolio in detail",
        description: "Key moments from the RIISE portfolio evolution.",
      },
      prototype: {
        eyebrow: "Prototype",
        title: "Explore the experience",
        description: "Walk through the latest RIISE portfolio journey.",
      },
      labels: {
        back_to_work: "Back to work",
        company: "Company",
        timeline: "Timeline",
        role: "My contribution",
        duration: "Journey",
        category: "Category",
        case_map: "Case map",
        technology: "Tools",
        tags: "Focus",
        external_links: "External links",
        previous_project: "Previous",
        next_project: "Next project",
      },
      seo: {
        title: "RIISE Portfolio Revamp",
        description:
          "How Aman Mishra simplified a data-heavy, multi-product investment portfolio through design-system adoption and a deeper UX revamp.",
      },
      cta: {
        eyebrow: "More product work",
        title: "Complex product. Clear experience.",
        label: "View more work",
        url: "/work",
      },
      sections: {
        overview: {
          visible: true,
          label: "Overview",
          eyebrow: "The product",
          title: "A portfolio carrying too much at once",
        },
        problem: {
          visible: true,
          label: "Challenge",
          eyebrow: "The tension",
          title: "Show more without making people work harder",
        },
        research: {
          visible: true,
          label: "Direction",
          eyebrow: "The simple questions",
          title: "What users need in the first few seconds",
        },
        process: {
          visible: true,
          label: "Approach",
          eyebrow: "Three deliberate stages",
          title: "Fix the foundation, then rethink the experience",
        },
        solution: {
          visible: true,
          label: "Revamp",
          eyebrow: "The latest experience",
          title: "Less repetition. Clearer priorities.",
        },
        impact: {
          visible: true,
          label: "Outcome",
          eyebrow: "What changed",
          title: "A portfolio built to grow without feeling heavier",
        },
        reflection: {
          visible: true,
          label: "Learning",
          eyebrow: "What stayed with me",
          title: "What the design system could not solve on its own.",
        },
      },
    },
    gallery: [],
    links: [],
    metrics: [
      {
        value: "3 stages",
        label: "Visible product evolution",
        hint: "Original, systemised, and fully revamped",
      },
      {
        value: "5+ assets",
        label: "One portfolio structure",
        hint: "Stocks, funds, U.S. stocks, IAP, and more",
      },
      {
        value: "1 view",
        label: "From summary to action",
        hint: "Value, performance, allocation, and risk",
      },
    ],
    featured: true,
    published: false,
    sort_order: 2,
    created_at: stamp,
    updated_at: stamp,
  },
  {
    id: "riise-first-time-user-journey",
    title: "RIISE First-Time User Journey",
    slug: "riise-first-time-user-journey",
    short_description:
      "Helping new users understand RIISE’s value, complete setup, fund their account, and place their first trade one clear step at a time.",
    overview:
      "<p>A first visit to an investment platform begins with an empty portfolio and a simple question: “Why should I stay?” A setup form would not give them a reason. RIISE already had a stronger answer: research.</p><p>I designed the first-time experience around a fair exchange. New users could explore the platform, see a real research idea, and understand what deeper access could unlock. In return, each setup request, from KYC and verification to funds and the first trade, arrived with a visible reason to continue.</p>",
    problem_statement:
      "<p>The risk was a dead-end guest experience: too many locked features, too little proof of value, and several important steps competing at once.</p><ul><li>Asking for KYC too early could feel like paperwork without a payoff.</li><li>Showing every research call would remove the value of completing setup.</li><li>Hiding everything would make RIISE feel empty.</li><li>The journey had to react to account status without making users relearn the homepage.</li></ul><p>The challenge was to <strong>let people feel the product before asking them to finish becoming a customer.</strong></p>",
    research:
      "<p>I mapped the questions a new user carries through the first session:</p><ol><li>What can I do here right now?</li><li>Why is this platform worth setting up?</li><li>What will KYC unlock?</li><li>What can I do while verification is in progress?</li><li>What is the single next step?</li></ol><p>That turned onboarding from one long checklist into five useful product states.</p>",
    design_process:
      "<p>I kept the homepage structure stable and changed only what needed to respond to the user’s progress.</p><ol><li><strong>Lead with value.</strong> Research, products, and market ideas remain explorable from the guest state.</li><li><strong>Preview the reward.</strong> One research call is readable while more ideas stay visibly locked.</li><li><strong>Ask for one action.</strong> The activation card changes from KYC to verification, funds, and first trade.</li><li><strong>Use waiting time well.</strong> Verification is not a blank screen; users can prepare the account and keep exploring.</li><li><strong>Preserve orientation.</strong> The same page, hierarchy, and navigation continue across all five states and both themes.</li></ol>",
    solution:
      "<p>The final journey feels less like a funnel and more like a guided first session.</p><ul><li><strong>Guest:</strong> explore RIISE and see enough research to understand its value.</li><li><strong>Complete KYC:</strong> connect the setup request to the access it unlocks.</li><li><strong>Verification:</strong> set clear expectations and keep useful actions available.</li><li><strong>Add funds:</strong> make account readiness the next focused step.</li><li><strong>First trade:</strong> bring expert ideas forward when the user can act on them.</li></ul><p>A persistent setup reminder keeps progress visible without interrupting exploration.</p>",
    outcome:
      "<p>The experience gives first-time users a reason to continue before their portfolio has any activity. It also gives the product team one reusable model for guest, incomplete, waiting, funded, and trade-ready states.</p><p>This is pre-launch work, so I am not claiming a conversion lift. The result is a complete set of states with one clear next action at each stage.</p>",
    learnings:
      "<p>KYC copy became easier once every request pointed to a visible benefit. Instead of asking users to finish setup in the abstract, the page showed what they would unlock next.</p>",
    role: "Journey strategy · UX/UI design · Prototyping",
    duration: "Guest discovery to first trade",
    company: "Motilal Oswal Financial Services",
    tools: ["Figma", "Design system", "Prototyping"],
    tags: ["Fintech", "Onboarding", "Activation", "Research"],
    category: "Onboarding & activation",
    timeline: "2026",
    thumbnail_url: "/projects/riise-first-time-user-journey/card-cover-premium.webp",
    presentation: {
      type: "case_study",
      card: {
        style: "image",
        image_alt: "RIISE first-time user experience ready for a first trade",
        eyebrow: "First-time journey",
      },
      hero: {
        style: "image",
        image_url: "/projects/riise-first-time-user-journey/05-first-trade-light.webp",
        image_alt: "Five stages of the RIISE guest-to-first-trade experience",
      },
      story: { enabled: false },
      gallery: {
        eyebrow: "Journey screens",
        title: "Every state in full",
        description: "Explore the complete light and dark experiences.",
      },
      prototype: {
        eyebrow: "Prototype",
        title: "Explore the first session",
        description: "Walk from guest discovery to the first trade.",
      },
      labels: {
        back_to_work: "Back to work",
        company: "Company",
        timeline: "Timeline",
        role: "My contribution",
        duration: "Journey",
        category: "Category",
        case_map: "Case map",
        technology: "Tools",
        tags: "Focus",
        external_links: "External links",
        previous_project: "Previous",
        next_project: "Next project",
      },
      seo: {
        title: "RIISE First-Time User Journey",
        description:
          "How Aman Mishra designed a value-led RIISE journey from guest discovery through KYC, account funding, and the first trade.",
      },
      cta: {
        eyebrow: "More product work",
        title: "Show the value before asking for setup.",
        label: "View more work",
        url: "/work",
      },
      sections: {
        overview: {
          visible: true,
          label: "Overview",
          eyebrow: "The first visit",
          title: "An empty portfolio should not feel like an empty product",
        },
        problem: {
          visible: true,
          label: "Challenge",
          eyebrow: "The tension",
          title: "Show enough value without giving everything away",
        },
        research: {
          visible: true,
          label: "Direction",
          eyebrow: "The questions",
          title: "What a new user needs before the first commitment",
        },
        process: {
          visible: true,
          label: "Approach",
          eyebrow: "The approach",
          title: "Keep the page stable. Let the next step change.",
        },
        solution: {
          visible: true,
          label: "Solution",
          eyebrow: "Five states",
          title: "From guest curiosity to the first trade",
        },
        impact: {
          visible: true,
          label: "Outcome",
          eyebrow: "What changed",
          title: "A first session with a visible reason to continue",
        },
        reflection: {
          visible: true,
          label: "Learning",
          eyebrow: "What stayed with me",
          title: "A good nudge makes the reward feel real",
        },
      },
    },
    gallery: [
      {
        url: "/projects/riise-first-time-user-journey/01-guest-light.webp",
        caption: "Guest · Light",
      },
      {
        url: "/projects/riise-first-time-user-journey/02-kyc-light.webp",
        caption: "Complete KYC · Light",
      },
      {
        url: "/projects/riise-first-time-user-journey/03-verification-light.webp",
        caption: "Verification · Light",
      },
      {
        url: "/projects/riise-first-time-user-journey/04-add-funds-light.webp",
        caption: "Add funds · Light",
      },
      {
        url: "/projects/riise-first-time-user-journey/05-first-trade-light.webp",
        caption: "First trade · Light",
      },
      {
        url: "/projects/riise-first-time-user-journey/01-guest-dark.webp",
        caption: "Guest · Dark",
      },
      {
        url: "/projects/riise-first-time-user-journey/02-kyc-dark.webp",
        caption: "Complete KYC · Dark",
      },
      {
        url: "/projects/riise-first-time-user-journey/03-verification-dark.webp",
        caption: "Verification · Dark",
      },
      {
        url: "/projects/riise-first-time-user-journey/04-add-funds-dark.webp",
        caption: "Add funds · Dark",
      },
      {
        url: "/projects/riise-first-time-user-journey/05-first-trade-dark.webp",
        caption: "First trade · Dark",
      },
    ],
    links: [],
    metrics: [
      {
        value: "5 states",
        label: "One activation path",
        hint: "Guest, KYC, verification, funds, and first trade",
      },
      {
        value: "2 themes",
        label: "One consistent journey",
        hint: "Light and dark experiences",
      },
      {
        value: "1 next step",
        label: "At every stage",
        hint: "A focused action without blocking exploration",
      },
    ],
    featured: true,
    published: false,
    sort_order: 3,
    created_at: stamp,
    updated_at: stamp,
  },
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
      "<p>I audited the existing homepage, mapped entry points and dependencies, reviewed available behaviour and portfolio signals, and worked with product stakeholders across business lines.</p><p>The audit changed how I saw the problem. Recommendations were only one part of it; the homepage also needed stable rules for relevance, priority, continuity, and discovery.</p>",
    design_process:
      "<p>I reframed the homepage as a system of prioritised zones rather than a fixed sequence of cards.</p><ol><li>Mapped user states across new, returning, invested, and active cohorts.</li><li>Separated persistent utilities from behaviour-led modules and discovery content.</li><li>Defined prioritisation rules using recent activity, holdings, lifecycle, and product eligibility.</li><li>Created responsive templates so teams could add modules without breaking the hierarchy.</li><li>Reviewed states with product, engineering, and compliance before high-fidelity handoff.</li></ol>",
    solution:
      "<p>The proposed architecture gives each user a clearer starting point while preserving access to the wider product ecosystem.</p><ul><li>A contextual top section for the user’s most relevant tasks and holdings.</li><li>Behaviour-led continuation modules that help users resume meaningful activity.</li><li>Lifecycle-aware discovery for products the user has not yet adopted.</li><li>Reusable module rules and component patterns for scalable future additions.</li><li>Dedicated new-user states that build understanding before promoting advanced products.</li></ul>",
    outcome:
      "<p>I created a shared framework that product teams could use to decide what appears, when it appears, and why. That gave design and engineering a clearer structure for implementation.</p><p>This work is still in progress, so I have kept the outcome to decisions I can discuss without exposing internal performance data.</p>",
    learnings:
      "<p>I learned to define the hierarchy before adding personalisation signals. My role was as much about making rules, dependencies, and trade-offs clear as it was about designing the interface.</p>",
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
    sort_order: 2,
    created_at: stamp,
    updated_at: stamp,
  },
  {
    id: "screener",
    title: "Screener: 0-to-1 Stock Discovery",
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
      "<p>I took the product from an early brief to a build-ready interaction model. Product and engineering left with a shared scope and a clear path from beginner to advanced use.</p><p>The product has not produced a publishable post-launch metric yet, so the outcome here is the product definition and build-ready model.</p>",
    learnings:
      "<p>I learned that an advanced tool does not need fewer capabilities. It needs useful starting points, progressive controls, and clear feedback when a filter changes the result.</p>",
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
    sort_order: 3,
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
      "<p>Trinkerr allowed users to import a portfolio, but the feature offered limited value after connection, especially for users with a single broker. Importing financial data required trust and effort, while the immediate benefit was unclear.</p><p>I redesigned the experience around a Portfolio Health Report: a clear, actionable view of performance, valuation, risk, allocation, and portfolio red flags.</p>",
    problem_statement:
      "<p>The original flow optimised the act of importing rather than the reason to import.</p><ul><li>Users could already view holdings in their broker app.</li><li>Connecting a broker introduced trust and privacy concerns.</li><li>The product did not preview the value users would receive.</li><li>Complex financial metrics risked becoming a dense data dump.</li></ul><p>The business goal was to improve portfolio imports; the user goal was to understand whether their portfolio was healthy and what deserved attention.</p>",
    research:
      "<p>I mapped the existing journey, reviewed user friction around broker connection, and worked with product stakeholders to identify the insights that could make an imported portfolio meaningfully different from a holdings list.</p><p>The central insight was that users did not need more numbers. They needed comparisons, interpretation, and prioritisation: Am I outperforming? Am I overvalued? Is risk concentrated? Which holdings need attention?</p>",
    design_process:
      "<p>I organised the report around a sequence of investor questions rather than internal data categories.</p><ol><li>Performance: XIRR compared with NIFTY 50.</li><li>Valuation: PE, PB, and PEG in market context.</li><li>Risk: beta explained through an approachable visual.</li><li>Allocation: stocks, sectors, and market-cap views with balanced versus concentrated interpretation.</li><li>Attention: a red-flag summary that leads users to the affected holdings.</li></ol><p>Broker pills let users view individual portfolios or a combined picture. Progressive disclosure kept the overview scannable while allowing deeper inspection.</p>",
    solution:
      "<p>The redesigned experience connected import directly to a valuable outcome.</p><ul><li>An insight-led health report immediately after portfolio connection.</li><li>Benchmarks and interpretation beside financial metrics.</li><li>Allocation views that explain concentration rather than only showing a chart.</li><li>Red flags framed as prioritised areas to investigate.</li><li>A demo health report that previews the value before users connect a broker.</li></ul>",
    outcome:
      "<p>The Portfolio Health Report contributed to a 9× increase in portfolio imports after launch. Introducing the demo report, so users could understand the value before connecting a broker, contributed a further 1.2× lift.</p><p>The increase came after users could see what they would get before they were asked to connect a broker.</p>",
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
    sort_order: 4,
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
      "<p>The system reduced avoidable inconsistency, made component decisions easier to review, and improved the shared understanding between design and engineering. It also created a stronger base for scaling new product modules without recreating common patterns.</p><p>We did not track a publishable percentage reduction, so I am keeping the outcome to the changes we could verify in the product and handoff process.</p>",
    learnings:
      "<p>What made the system useful was not the size of the library. It was the less visible work around naming, documentation, code mapping, and adoption.</p>",
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
    sort_order: 5,
    created_at: stamp,
    updated_at: stamp,
  },
];
