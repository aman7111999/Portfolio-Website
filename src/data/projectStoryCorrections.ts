import type { ProjectStoryOverride } from "@/data/projectStoryPreview";

const PROJECT_STORY_CORRECTIONS: Record<string, ProjectStoryOverride> = {
  "portfolio-analysis": {
    short_description:
      "Helping investors understand how their portfolio is actually doing across performance, allocation, diversification, risk, and other key signals, whether the investments are held with Motilal Oswal or brought in from outside.",
    overview:
      "<p>Seeing what you own is not the same as understanding your portfolio.</p><p>An investor can have a complete list of stocks and mutual funds and still be unsure whether the portfolio is performing well, too concentrated, carrying more risk than expected, or showing issues that need attention.</p><p>That was the real purpose of <strong>Portfolio Analysis</strong>. We wanted to move beyond a holdings view and help users evaluate their portfolio across multiple parameters, understand what those signals mean, and identify where they may need to look deeper.</p><p>The analysis works across Motilal Oswal holdings as well as externally linked portfolios, but the source is secondary. The core experience is about helping users understand the health and behaviour of their investments.</p><p>I worked across product framing, information architecture, interaction design, high-fidelity UI, portfolio states, and design-system-aligned handoff.</p>",
    problem_statement:
      "<p>Most portfolio experiences are good at answering one question: <strong>What do I own?</strong> The harder questions begin after that.</p><ul><li>How has my portfolio performed?</li><li>Is my money too concentrated in a few stocks, sectors, or categories?</li><li>How diversified is the portfolio?</li><li>What level of risk am I carrying?</li><li>Are there specific holdings or patterns that need attention?</li></ul><p>Raw financial data can answer all of these technically, but presenting every metric at once creates another problem. Users need help understanding which signals matter and what they mean in the context of their own portfolio.</p><p>For the business, Portfolio Analysis had to become more than a one-time report. It needed to provide enough ongoing value that investors would come back as their portfolio changed.</p>",
    research:
      "<p>I approached the experience around the questions an investor is trying to answer, rather than around where the portfolio came from.</p><p>The analysis needed to work for stocks and mutual funds, for Motilal Oswal holdings and externally linked investments, while still feeling like one product.</p><p>That led to a simple principle: <strong>the portfolio source can change, but the way users understand portfolio health should remain familiar.</strong></p><p>The information hierarchy was then shaped around the major analytical needs: performance, allocation, diversification, risk, concentration, and areas that may require attention.</p>",
    design_process:
      "<p>I structured Portfolio Analysis from a broad health check into progressively deeper investigation.</p><ol><li><strong>Start with the portfolio picture.</strong> Give users a quick understanding of how the portfolio is doing before asking them to interpret detailed metrics.</li><li><strong>Break the analysis into understandable parameters.</strong> Performance, allocation, diversification, concentration, risk, and attention areas are separated so users can process one question at a time.</li><li><strong>Add meaning to the numbers.</strong> Metrics are paired with context and interpretation instead of being presented as standalone financial data.</li><li><strong>Connect signals to holdings.</strong> When something needs attention, users can move from the portfolio-level insight to the stocks or funds contributing to it.</li><li><strong>Keep the experience consistent across portfolios.</strong> Motilal Oswal and externally linked portfolios follow the same analysis language while keeping the source visible where it matters.</li><li><strong>Design beyond the ideal state.</strong> I covered different portfolio types, empty and partial states, syncing, errors, expanded details, and light and dark experiences.</li></ol>",
    solution:
      "<p>The final experience turns the portfolio from a list of investments into something users can actively evaluate.</p><ul><li><strong>Portfolio-level analysis</strong> gives users a clear starting point before they move into individual holdings.</li><li><strong>Performance insights</strong> help users understand how the portfolio has behaved over time and in context.</li><li><strong>Allocation and concentration views</strong> show where money is distributed and where exposure may be too high.</li><li><strong>Diversification and risk signals</strong> help users understand the structure of the portfolio, not just its returns.</li><li><strong>Attention areas and deeper breakdowns</strong> connect a portfolio-level signal to the stocks or mutual funds behind it.</li><li><strong>One analysis model across portfolio sources</strong> means the same experience works whether investments are held internally or linked from outside.</li></ul><p>The goal was not to simplify the portfolio by hiding financial depth. It was to make that depth easier to understand and act on.</p>",
    outcome:
      "<p>Portfolio Analysis has been used by <strong>4,89,069 unique users in the last six months</strong>.</p><p>More importantly, <strong>70% of those users used Portfolio Analysis more than once</strong>. That repeat behaviour matters because portfolio analysis is most useful when it becomes something investors return to as their holdings and markets change, rather than a report they open once and forget.</p><p>For users, the feature creates a clearer way to understand portfolio health across multiple parameters. For the business, the level of repeat usage shows that Portfolio Analysis has become a recurring engagement point inside the investing experience.</p>",
    learnings:
      "<p>The biggest lesson was that portfolio analysis is not about showing the maximum number of metrics. It is about helping users understand what each signal means for their own investments.</p><p>Internal and external portfolios were important product requirements, but they were never the story. The story is whether a user can look at a complex portfolio and leave with a clearer understanding of how it is doing and what deserves attention.</p>",
    metrics: [
      {
        value: "4,89,069",
        label: "Unique users in 6 months",
        hint: "Users who used Portfolio Analysis",
      },
      {
        value: "70%",
        label: "Used it more than once",
        hint: "Repeat usage among Portfolio Analysis users",
      },
      {
        value: "Multi-parameter",
        label: "Portfolio health analysis",
        hint: "Performance, allocation, diversification, risk, concentration, and more",
      },
    ],
  },

  "riise-portfolio-revamp": {
    short_description:
      "RIISE already supported multiple investment products, but the portfolio experience had become cluttered and visually dated. I worked through its evolution from design-system cleanup to a deeper UX and UI revamp that made the same portfolio easier to understand and use.",
    overview:
      "<p>RIISE already had a broad portfolio experience covering multiple investment products. The problem was not that we needed to fit a new product into it.</p><p>The oldest portfolio had simply accumulated a lot of information over time. Multiple cards, repeated values, different visual treatments, and an older UI made the page feel cluttered and dated even though the underlying product was useful.</p><p>The improvement happened in two meaningful steps. First, during the RIISE design-system implementation, we brought consistency to the existing experience. Later, we went beyond the system layer and reworked the portfolio itself to improve its UX, hierarchy, visual quality, and overall feel.</p><p>The latest revamp uses essentially the same product set. What changed is how clearly the experience communicates it.</p>",
    problem_statement:
      "<p>The oldest portfolio contained the information users needed, but too many elements competed for attention.</p><ul><li>Multiple product cards made the page feel heavy.</li><li>Important portfolio information and supporting information often had similar visual weight.</li><li>Repeated patterns increased the amount users had to scan.</li><li>The visual language felt dated and inconsistent across the experience.</li><li>Improving components alone could not fully solve the hierarchy and usability issues.</li></ul><p>The challenge was not to add more capability. It was to make an already capable portfolio feel simpler, more modern, and easier to understand.</p>",
    research:
      "<p>I reviewed the existing portfolio screen by screen and looked at where the experience was creating unnecessary visual and cognitive load.</p><p>I also compared the portfolio with contemporary investment products, but the goal was not to copy a benchmark. The useful question was: <strong>what should a user understand first when they open their portfolio, and what can wait until they choose to explore further?</strong></p><p>That gave us a clearer hierarchy around portfolio value, performance, asset-level information, and supporting details.</p>",
    design_process:
      "<p>The evolution is best understood in three stages.</p><ol><li><strong>Original portfolio.</strong> The product already supported multiple investment types, but the experience was card-heavy, visually inconsistent, and increasingly difficult to scan.</li><li><strong>Design-system implementation.</strong> We applied the new RIISE design system to improve typography, spacing, colours, components, states, and overall consistency. This made the same experience feel cleaner and more current without fundamentally changing its information structure.</li><li><strong>Latest revamp.</strong> We then revisited the UX and UI itself. I reworked hierarchy, grouping, spacing, visual emphasis, and the way portfolio information is presented so the experience feels lighter and easier to understand.</li></ol><p>No new product was needed to justify the latest revamp. The opportunity was improving the experience of the products users already had.</p>",
    solution:
      "<p>The latest portfolio keeps the breadth of the existing product while presenting it with much clearer priorities.</p><ul><li><strong>A stronger portfolio summary</strong> makes the most important value and performance information easier to understand at a glance.</li><li><strong>Cleaner grouping and hierarchy</strong> reduce the feeling that every section is competing for attention.</li><li><strong>More scannable product information</strong> makes it easier to move across different investment types.</li><li><strong>Improved spacing, typography, components, and visual treatment</strong> give the product a more modern and trustworthy feel.</li><li><strong>Secondary information moves to the right depth</strong> instead of crowding the first read.</li></ul><p>The financial information remains rich. The improvement is in how calmly and deliberately it is presented.</p>",
    outcome:
      "<p>The latest revamp did not add another investment product. It improved the experience of the portfolio that was already there.</p><p>Compared with the oldest version, the portfolio now has a clearer hierarchy, less visual noise, more consistent interaction patterns, and a more contemporary UI. Compared with the design-system version, it goes a step further by improving the underlying UX rather than only standardising the visual language.</p><p>For users, that means less effort to scan and understand a data-heavy portfolio. For the business, it improves the quality and perceived maturity of one of RIISE's core product experiences without requiring a change in the underlying product mix.</p>",
    learnings:
      "<p>This project made the difference between a design-system improvement and a product revamp very clear to me.</p><p>The design system gave us consistency and a stronger visual foundation. The later revamp used that foundation to make better decisions about hierarchy, grouping, emphasis, and overall usability. A cleaner component does not automatically create a clearer experience.</p>",
    metrics: [
      {
        value: "3 stages",
        label: "Visible evolution",
        hint: "Original, design-system implementation, and latest revamp",
      },
      {
        value: "Same products",
        label: "Better experience",
        hint: "The latest revamp focused on UX, UI, hierarchy, and visual quality",
      },
      {
        value: "UX + UI",
        label: "Beyond a visual refresh",
        hint: "Hierarchy, grouping, scanability, consistency, and overall feel",
      },
    ],
  },
};

export function applyProjectStoryCorrections<T extends { slug: string }>(project: T): T {
  const override = PROJECT_STORY_CORRECTIONS[project.slug];
  if (!override) return project;
  return { ...project, ...override } as T;
}
