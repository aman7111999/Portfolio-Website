const EXACT_COPY_REWRITES = new Map<string, string>([
  ["Aman Mishra \u2014 Senior Product Designer", "Aman Mishra | Senior Product Designer"],
  ["Aman Mishra \u2014 Product Designer", "Aman Mishra | Product Designer"],
  ["Aman Mishra \u2014 Portfolio", "Aman Mishra | Portfolio"],
  ["Résumé \u2014 Senior Product Designer", "Résumé | Senior Product Designer"],
  ["Screener \u2014 0-to-1 Stock Discovery", "Screener: 0-to-1 Stock Discovery"],
  ["Message sent \u2014 I’ll get back to you soon.", "Message sent. I’ll get back to you soon."],
  [
    "Message sent \u2014 I'll reply within 2 business days.",
    "Message sent. I'll reply within 2 business days.",
  ],
  [
    "Thanks \u2014 your message was delivered to Aman.",
    "Thanks. Your message was delivered to Aman.",
  ],
  [
    "Senior Product Designer with 4.5+ years of experience across fintech, AI-assisted products, 0-to-1 launches, and design systems.",
    "Senior Product Designer with 4.5+ years designing investment products, AI-assisted tools, and design systems at Motilal Oswal and Trinkerr.",
  ],
  ["FINTECH • AI • PRODUCT SYSTEMS •", "FINTECH • RESEARCH • INTERACTION •"],

  ["Complex problems. Clear decisions.", "A few problems I’ve"],
  ["Evidence over decoration.", "enjoyed untangling."],
  ["4.5+ years simplifying", "4.5+ years designing"],
  ["complex financial products.", "investment products."],
  ["From 0-to-1 launches", "From first sketch"],
  ["to systems at scale", "to shipped product"],
  [
    "I’m {name}, a product designer focused on fintech, AI-assisted experiences, and scalable product systems. I turn dense workflows and ambiguous requirements into clear journeys that users can understand and teams can ship.",
    "Most of my work has been in investing products, where a screen can carry a lot of data and still needs to feel calm. I enjoy working through that mess with product and engineering until the next step feels obvious.",
  ],
  [
    "The strongest design decisions make complexity feel inevitable, not visible.",
    "I enjoy the moment when a complicated flow finally feels obvious.",
  ],
  ["Working together", "Working with me"],
  ["How I", "What it’s like"],
  ["work", "working"],
  ["on complex products", "with me"],
  [
    "A concise view of the ownership and collaboration I bring to a senior product-design role.",
    "The questions hiring managers usually ask, answered plainly.",
  ],
  [
    "Complex B2C products where information is dense, the problem is ambiguous, and design must balance user needs, business goals, technical constraints, and compliance.",
    "I do my best work on products with dense information, unclear starting points, and real constraints. Investing products are a good example: the experience has to help the user, work for the business, and stay honest about risk.",
  ],
  [
    "I contribute from problem framing and product discovery through information architecture, prototyping, validation, visual design, handoff, implementation reviews, and post-launch iteration.",
    "I stay with a problem from the first conversation through research, flows, prototypes, visual design, build reviews, and the changes that follow launch.",
  ],
  [
    "I align early on the problem, constraints, and success criteria; make trade-offs visible; prototype decisions quickly; and stay involved through development so the shipped experience retains its intent.",
    "I bring product and engineering in early, prototype the uncertain parts, and write down the trade-offs. During the build, I review the real product with the team instead of treating handoff as the finish line.",
  ],
  [
    "Senior Product Designer opportunities across fintech, AI, consumer products, and platform experiences where I can own meaningful product areas and help raise the quality bar.",
    "I’m looking for a Senior Product Designer role where I can own a meaningful product area. Fintech and AI are natural fits, but I’m also interested in consumer products with complicated workflows.",
  ],
  ["Let’s make", "Have a product"],
  ["complexity", "problem"],
  ["feel simple.", "worth talking through?"],
  [
    "I’m exploring Senior Product Designer opportunities across fintech, AI, and product platforms. If you’re building something complex and meaningful, I’d love to hear about it.",
    "I’m open to Senior Product Designer roles. If the work involves fintech, AI, or a product with a lot of moving parts, I’d be glad to hear about it.",
  ],

  ["I turn complex product problems into", "I design products that make"],
  ["clear, scalable", "dense information"],
  ["experiences.", "easier to act on."],
  [
    "Growing from execution to product ownership.",
    "I started with screens. The work grew into systems and product decisions.",
  ],
  [
    "A progression across foundational investing journeys, measurable product outcomes, 0-to-1 launches, and platform-level design.",
    "The roles, products, and decisions that shaped how I work today.",
  ],
  ["The products and teams I’ve helped move forward.", "What I worked on, and what changed."],
  [
    "Open each role to see the scope, decisions, and outcomes I owned or influenced.",
    "Open a role for the products, responsibilities, and results behind it.",
  ],
  ["Strategy, craft, research, and systems.", "The skills I use most often."],
  [
    "Four principles I use when the answer is not obvious.",
    "Four habits I rely on when the answer is not obvious.",
  ],
  ["Clarity before novelty", "Make the next step obvious"],
  ["Evidence before preference", "Ask for evidence"],
  ["Systems before isolated screens", "Design beyond one screen"],
  ["Shipping is part of design", "Stay until it ships"],
  ["How I move work from ambiguity to release.", "How I work through an unclear product problem."],
  ["Frame the problem", "Start with the problem"],
  ["Prototype the decision", "Prototype early"],
  ["Make trade-offs visible", "Call out trade-offs"],
  ["Stay through implementation", "Stay close to the build"],
  ["The qualities behind the output.", "What teammates can expect from me."],
  ["Let’s simplify", "Tell me what"],
  ["something complex", "you’re working on"],
  [
    "A concise view of my product scope, progression, and core capabilities. Download the PDF for applications and recruiter conversations.",
    "The short version of my experience, projects, and skills. The PDF is ready for applications and recruiter conversations.",
  ],
]);

const LEGACY_COPY_REWRITES: ReadonlyArray<readonly [string, string]> = [
  [
    "My work sits at the intersection of product strategy, interaction design, and systems thinking. I’m strongest when the problem is ambiguous, the information is dense, and the experience must balance user needs, business goals, and regulatory constraints.",
    "I’m usually working on problems with a lot of information, an unclear starting point, and constraints that cannot be designed away. I like finding the structure that helps the user decide what to do next.",
  ],
  [
    "I work closely with product, engineering, research, and compliance from problem framing and prototyping through handoff, validation, and launch. I’m currently exploring Senior Product Designer opportunities across fintech, AI, consumer products, and complex digital platforms.",
    "I stay close to product, engineering, research, and compliance from the first sketch through the shipped build. I’m currently looking for a Senior Product Designer role in fintech, AI, or another product with genuinely complicated workflows.",
  ],
  [
    "Leading product design across high-impact Riise initiatives spanning homepage personalisation, stock discovery, AI-assisted investing, and scalable platform experiences.",
    "At Motilal Oswal, I design Riise’s homepage personalisation, stock discovery, AI-assisted investing, and portfolio experiences.",
  ],
  [
    "Designed investing and advisory experiences for a SEBI-registered platform, with a focus on data storytelling, product adoption, and cross-platform consistency.",
    "At Trinkerr, I designed portfolio and advisory products for a SEBI-registered platform across iOS and Android.",
  ],
  [
    "Owned foundational investing experiences across portfolio tracking, watchlists, stock details, and transaction flows for mobile users.",
    "I worked on the everyday investing flows: portfolios, watchlists, stock details, and transactions on mobile.",
  ],

  [
    "The product opportunity was not another holdings view; it was a decision layer that could interpret the whole picture.",
    "The real need was a decision layer that could interpret the whole picture, not another list of holdings.",
  ],
  ["The synthesis revealed four recurring needs:", "Four questions kept coming up:"],
  [
    "The work established one scalable portfolio-intelligence model across internal and external investments, designed for <strong>2M+ portfolio-analysis use cases</strong>.",
    "I designed one portfolio-analysis model for internal and external investments, covering <strong>2M+ portfolio-analysis use cases</strong>.",
  ],
  [
    "No unverified conversion or post-launch uplift is presented. The defensible outcome is the product architecture, build-ready journey, and scale of use cases covered.",
    "The product is still confidential, so I am showing the scope, architecture, and build-ready journey rather than a conversion claim.",
  ],
  [
    "Simplifying a data-heavy, multi-product portfolio into a calm, structured experience with clearer priorities and lower cognitive load.",
    "Reworking a crowded multi-product portfolio so people can understand value, performance, allocation, and risk without digging through repeated cards.",
  ],
  [
    "The result is not less data. It is <strong>better-timed data</strong>.",
    "The data is still there, but it appears when it becomes useful.",
  ],
  [
    "No unsupported uplift is claimed here. The evidence is visible in the evolution: stronger hierarchy, lower repetition, and a structure designed to scale.",
    "This work is still being rolled out, so I am not attaching an uplift figure. The visible change is a clearer hierarchy, less repetition, and a structure that can take on new products.",
  ],
  [
    "My biggest learning: <strong>simplification is not removing information. It is giving every piece of information the right moment.</strong>",
    "I learned that removing information was rarely the answer. Better hierarchy was.",
  ],
  [
    "Consistency opens the door. Hierarchy changes the experience.",
    "What the design system could not solve on its own.",
  ],
  [
    "The evidence here is the journey itself rather than an invented conversion claim: each screen has one clear next action, research stays visible, and the page grows more useful as the account becomes more complete.",
    "This is pre-launch work, so I am not claiming a conversion lift. The result is a complete set of states with one clear next action at each stage.",
  ],
  [
    "A nudge works better when it points to a reward people can already understand. The strongest onboarding message was not “Complete your KYC.” It was “Here is what becomes possible when you do.”",
    "KYC copy became easier once every request pointed to a visible benefit. Instead of asking users to finish setup in the abstract, the page showed what they would unlock next.",
  ],
  ["Product value before product friction.", "Show the value before asking for setup."],
  [
    "For RIISE, the answer could not be another setup form. It had to be the strength Motilal Oswal is already known for\u2014research.",
    "A setup form would not give them a reason. RIISE already had a stronger answer: research.",
  ],
  [
    "The key insight was that personalisation was not only a recommendation problem. It was an information-architecture problem: the platform needed stable rules for relevance, priority, continuity, and discovery.",
    "The audit changed how I saw the problem. Recommendations were only one part of it; the homepage also needed stable rules for relevance, priority, continuity, and discovery.",
  ],
  [
    "The work created a shared personalisation framework across multiple product teams and shifted the conversation from adding homepage cards to managing relevance. It reduced structural ambiguity for design and engineering and established a scalable direction for implementation.",
    "I created a shared framework that product teams could use to decide what appears, when it appears, and why. That gave design and engineering a clearer structure for implementation.",
  ],
  [
    "Because this work is current, outcome claims are limited to what can be stated honestly without exposing internal performance data.",
    "This work is still in progress, so I have kept the outcome to decisions I can discuss without exposing internal performance data.",
  ],
  [
    "Personalisation fails when it becomes a collection of isolated recommendations. The stronger approach is to define a coherent hierarchy first, then use signals to adapt it. Senior design ownership here meant making product rules, dependencies, and trade-offs visible\u2014not only producing the final UI.",
    "I learned to define the hierarchy before adding personalisation signals. My role was as much about making rules, dependencies, and trade-offs clear as it was about designing the interface.",
  ],
  [
    "The work established the foundational experience and reusable architecture for a new product line. It aligned product and engineering around a shared scope, clarified the novice-to-advanced progression, and produced a build-ready interaction model.",
    "I took the product from an early brief to a build-ready interaction model. Product and engineering left with a shared scope and a clear path from beginner to advanced use.",
  ],
  [
    "No adoption or conversion figures are claimed because verified post-launch data is not yet available for publication.",
    "The product has not produced a publishable post-launch metric yet, so the outcome here is the product definition and build-ready model.",
  ],
  [
    "The strongest way to simplify an advanced tool is not to remove capability. It is to provide meaningful starting points, reveal complexity progressively, and make every added control explain its effect.",
    "I learned that an advanced tool does not need fewer capabilities. It needs useful starting points, progressive controls, and clear feedback when a filter changes the result.",
  ],
  [
    "The project demonstrated that adoption improved when the experience made the promised outcome visible before asking users for effort and trust.",
    "The increase came after users could see what they would get before they were asked to connect a broker.",
  ],
  [
    "No percentage reduction is presented because a verified measurement source is not available for publication.",
    "We did not track a publishable percentage reduction, so I am keeping the outcome to the changes we could verify in the product and handoff process.",
  ],
  [
    "A design system scales through governance and adoption, not the size of its library. Component properties, naming, documentation, and code alignment often create more value than adding another set of polished variants.",
    "What made the system useful was not the size of the library. It was the less visible work around naming, documentation, code mapping, and adoption.",
  ],
];

export function cleanPublicText(value: string): string {
  let cleaned = EXACT_COPY_REWRITES.get(value) ?? value;

  for (const [legacy, replacement] of LEGACY_COPY_REWRITES) {
    cleaned = cleaned.split(legacy).join(replacement);
  }

  return cleaned
    .replace(/(\d)\s*\u2014\s*(\d)/g, "$1–$2")
    .replace(/\s*\u2014\s*/g, ", ")
    .replace(/\s+,/g, ",")
    .replace(/,{2,}/g, ",");
}

export function cleanPublicCopy<T>(value: T): T {
  if (typeof value === "string") return cleanPublicText(value) as T;

  if (Array.isArray(value)) {
    return value.map((item) => cleanPublicCopy(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        cleanPublicCopy(item),
      ]),
    ) as T;
  }

  return value;
}
